const YTDlpWrap = op.require('yt-dlp-wrap').default;

const inBinaryPath = op.inString("yt-dlp Binary Path"),
      inUrl = op.inString("URL"),
      inExecute = op.inTrigger("Execute"),
      outVideoUrl = op.outString("Video URL"),
      outAudioUrl = op.outString("Audio URL"),
      outSeparateTracks = op.outBool("Separate Tracks"),
      outStarted = op.outTrigger("Started"),
      outFinished = op.outTrigger("Finished"),
      outError = op.outTrigger("Error"),
      outErrorMessage = op.outString("Error Message")

inExecute.onTriggered = async () => {
    outSeparateTracks.set(false);
    outVideoUrl.set("");
    outAudioUrl.set("");
    outErrorMessage.set("");

    try {
        const ytDlpWrap = new YTDlpWrap(inBinaryPath.get());
        let stdout = await ytDlpWrap.execPromise([
            inUrl.get(),
            '--format',
            '(bv+ba/b)[protocol^=http][protocol!=dash]',
            '--simulate',
            '--quiet',
            '--get-url'
        ]);

        const output = stdout.trim().split('\n');

        outVideoUrl.set(output[0]);
        if (output.length == 2) {
            outAudioUrl.set(output[1]);
            outSeparateTracks.set(true);
        }

        outFinished.trigger();
    } catch (e) {
        console.log(e.message);
        let errorMsg = e.message;
        if (errorMsg.indexOf("ERROR: ") !== -1) {
            errorMsg = errorMsg.substring(errorMsg.indexOf("ERROR: "));
            errorMsg = errorMsg.replace(/\r?\n|\r/g, '');
            errorMsg = errorMsg.split('Stderr:')[0];
            console.log(errorMsg);
            outErrorMessage.set(errorMsg);
        }
        outError.trigger();
    }
}