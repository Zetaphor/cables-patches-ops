const { OpenAI } = op.require('openai');

const
    inAPIKey = op.inString("API Key", "OPENAI API KEY"),
    inModelName = op.inString("Model Name", "gpt-3.5-turbo"),
    inTemperature = op.inFloat("Temperature", 0.7),
    inMessages = op.inArray("Messages"),
    inStreaming = op.inBool("Streaming Output", true),
    inJSONMode = op.inBool("JSON Mode", false),
    inGenerate = op.inTrigger("Generate"),
    outResponse = op.outString("Response"),
    outResponseObject = op.outObject("Response Object"),
    outReceivedResponse = op.outTrigger("Received Response"),
    outGenerationStarted = op.outTrigger("Generation Started"),
    outGenerationFinished = op.outTrigger("Generation Finished"),
    outErrored = op.outTrigger("Error Occured"),
    outErrorMsg = op.outString("Error Message")

let openAIApi = null;

function initializeAPI() {
    if (openAIApi === null) {
        openAIApi = new OpenAI({ apiKey: inAPIKey.get(), dangerouslyAllowBrowser: true });
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
            stream: inStreaming.get(),
        };

        if (inJSONMode.get()) streamOpts['response_format'] = {type: "json_object"};

        const stream = await openAIApi.beta.chat.completions.stream(streamOpts);

        stream.on('content', (delta, snapshot) => {
            if (!inStreaming.get() || inJSONMode.get()) return;
            outResponse.set(delta);
            outReceivedResponse.trigger();
        });

        const chatCompletion = await stream.finalChatCompletion();
        const finalOutput = chatCompletion.choices[0].message.content;
        console.log(typeof finalOutput, finalOutput);

        if (inJSONMode.get()) {
            outResponseObject.set(JSON.parse(finalOutput));
            outReceivedResponse.trigger();
        }

        if (!inStreaming.get()) {
            outResponse.set(chatCompletion.choices[0].message.content);
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