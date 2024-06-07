const { Groq } = op.require('groq-sdk');

const
    inAPIKey = op.inString("API Key", "GROQ API KEY"),
    inModelName = op.inString("Model Name", "llama3-70b-8192"),
    inTemperature = op.inFloat("Temperature", 0.7),
    inMaxTokens = op.inInt("Max Tokens",1024),
    inMessages = op.inArray("Messages"),
    inStreaming = op.inBool("Streaming Output", false),
    inJSONMode = op.inBool("JSON Mode", false),
    inGenerate = op.inTrigger("Generate"),
    outResponse = op.outString("Response"),
    outResponseObject = op.outObject("Response Object"),
    outReceivedResponse = op.outTrigger("Received Response"),
    outGenerationStarted = op.outTrigger("Generation Started"),
    outGenerationFinished = op.outTrigger("Generation Finished"),
    outErrored = op.outTrigger("Error Occured"),
    outErrorMsg = op.outString("Error Message")

let groqAIApi = null;

function initializeAPI() {
    if (groqAIApi === null) {
        const apiOpts = { apiKey: inAPIKey.get(), dangerouslyAllowBrowser: true };


        groqAIApi = new Groq(apiOpts);
    }
}

inGenerate.onTriggered = async () => {
    try {
        initializeAPI();
        let messages = [];

        const rawMessages = inMessages.get();

        try {
            for (var i = 0; i < rawMessages.length; i++) {
                messages.push(JSON.parse(rawMessages[i]));
            }
        } catch (e) {
            op.setUiError("inMessages", "Failed to parse JSON from messages");
            throw new Error("Failed to parse JSON from messages");
        }

        outGenerationStarted.trigger();

        const streamOpts = {
            model: inModelName.get(),
            temperature: inTemperature.get(),
            messages: messages,
            stream: Boolean(inStreaming.get()),
            max_tokens: inMaxTokens.get()
        };

        if (inJSONMode.get()) streamOpts['response_format'] = {type: "json_object"};

        const comletion = await groqAIApi.chat.completions.create(streamOpts);

        let finalOutput = "";

        if (inStreaming.get() && !inJSONMode.get()) {
            for await (const chunk of stream) {
                if (inStreaming.get() && !inJSONMode.get()) {
                    if (chunk.choices[0].delta.content == null) return;
                    outResponse.set(chunk.choices[0].delta.content);
                    outReceivedResponse.trigger();
                } else {
                    finalOutput += chunk.choices[0].delta.content;
                }
            }
        } else {
            streamOpts.stream = false;
            const completion = await groqAIApi.chat.completions.create(streamOpts);
            finalOutput = completion.choices[0].message.content;
        }

        if (inJSONMode.get()) {
            outResponseObject.set(JSON.parse(finalOutput));
            outReceivedResponse.trigger();
        }

        if (!inStreaming.get()) {
            outResponse.set(finalOutput);
            outReceivedResponse.trigger();
        }

        outGenerationFinished.trigger();


    } catch (e) {
        console.log(e.message);
        op.setUiError("inAPIKey", "An error occured, see error message below");
        outErrorMsg.set(e.message);
        outErrored.trigger();
    }
}

