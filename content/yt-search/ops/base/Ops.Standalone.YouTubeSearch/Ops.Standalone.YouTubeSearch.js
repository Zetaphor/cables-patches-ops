const yts = op.require('yt-search');

const
    inSearch = op.inTrigger("Execute"),
    inSearchTerm = op.inString("Search Term"),
    outResultsRaw = op.outArray("Raw Results"),
    outResultsUrls = op.outArray("Video URLs"),
    outStarted = op.outTrigger("Started"),
    outFinished = op.outTrigger("Finished"),
    outError = op.outTrigger("Error"),
    outErrorMessage = op.outString("Error Message")

inSearch.onTriggered = async () => {
    outStarted.trigger();
    try {
        const results = await yts(inSearchTerm.get());
        outResultsRaw.set(results.videos);
        let urlList = [];
        for (var i = 0; i < results.videos.length; i++) {
            urlList.push(results.videos[i].url);
        }
        outResultsUrls.set(urlList);
        outFinished.trigger();
    } catch (e) {
        outErrorMessage.set(e.message);
        outError.trigger();
        op.setUiError("inSearch", "An error occured, see error message below");
    }
};