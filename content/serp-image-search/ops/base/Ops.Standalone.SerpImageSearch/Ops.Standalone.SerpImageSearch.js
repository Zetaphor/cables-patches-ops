const { getJson } = op.require("serpapi");

const
    inSearch = op.inTrigger("Execute"),
    inApiKey = op.inString("Serp API Key", "SERPAPI_API_KEY"),
    inSearchTerm = op.inString("Search Term"),
    inSafeSearch = op.inBool("Safe Search",true),
    outResults = op.outArray("Results"),
    outStarted = op.outTrigger("Started"),
    outFinished = op.outTrigger("Finished"),
    outError = op.outTrigger("Error"),
    outErrorMessage = op.outString("Error Message")

inSearch.onTriggered = async () => {
    outStarted.trigger();
    try {
        const results = await getJson({
            q: inSearchTerm.get(),
            engine: "google_images",
            ijn: "0",
            api_key: inApiKey.get(),
            safe: inSafeSearch.get() ? 'active' : 'off'
        });
        outResults.set(results.images_results);
        outFinished.trigger();
    } catch (e) {
        console.error(e);
        outErrorMessage.set(e.message);
        outError.trigger();
        op.setUiError("inApiKey", "An error occured, see below error message");
    }
};
