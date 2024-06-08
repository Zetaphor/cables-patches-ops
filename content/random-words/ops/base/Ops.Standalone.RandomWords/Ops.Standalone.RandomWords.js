const niceware = op.require('niceware')

const
    inGenerate = op.inTrigger("Trigger"),
    inTotalWords = op.inInt("Number Of Words",3),
    inSeparator = op.inString("Separator", " "),
    outResultsString = op.outString("Results String"),
    outResultsArray = op.outArray("name"),
    outFinished = op.outTrigger("Finished")

inGenerate.onTriggered = () => {
    const result = niceware.generatePassphrase(2 * inTotalWords.get());
    outResultsString.set(result.join(inSeparator.get()));
    outResultsArray.set(result);
    outFinished.trigger();
};
