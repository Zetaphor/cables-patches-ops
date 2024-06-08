# Zetaphor's Cables.gl Standalone Patches & Ops

This repository contains my custom patches and ops for the [Cables.gl](https://cables.gl) [standalone Electron app](https://github.com/cables-gl/cables_electron).

## Custom Ops

### Websocket Server

* [Documentation](https://github.com/Zetaphor/cables-patches-ops/blob/main/content/websocket-server/README.md)
* [Download Example Patch](https://github.com/Zetaphor/cables-patches-ops/blob/main/downloads/websocket-server.zip?raw=true)

This op uses the [`ws`](https://www.npmjs.com/package/ws) package to implement a WebSocket server. This can be used to commuinicate with the browser, other cables patches, or native applications.

### OpenAI Client

* [Documentation](https://github.com/Zetaphor/cables-patches-ops/blob/main/content/openai-client/README.md)
* [Download Example Patch](https://github.com/Zetaphor/cables-patches-ops/blob/main/downloads/openai-client.zip?raw=true)

This op uses the [`openai`](https://www.npmjs.com/package/openai) package to implement an OpenAI API client. It supports streaming responses and JSON mode.

The baseURL field is supported, so you can use any OpenAI API compatible API URL (ex: [LM Studio](https://lmstudio.ai/), [ollama](https://ollama.com/)).

### Groq Client

* [Documentation](https://github.com/Zetaphor/cables-patches-ops/blob/main/content/groq-client/README.md)
* [Download Example Patch](https://github.com/Zetaphor/cables-patches-ops/blob/main/downloads/groq-client.zip?raw=true)

This op uses the [`groq-sdk`](https://www.npmjs.com/package/groq-sdk) package to implement a Groq API client. It supports streaming responses and JSON mode.

[Groq](https://groq.com/) offers a generous free tier for their API, and their inference speeds are 1000+ tokens/second.

### yt-dlp Video URL Grabber

* [Documentation](https://github.com/Zetaphor/cables-patches-ops/blob/main/content/yt-dlp/README.md)
* [Download Example Patch](https://github.com/Zetaphor/cables-patches-ops/blob/main/downloads/yt-dlp.zip?raw=true)

This op uses the [`yt-dlp-wrap`](https://www.npmjs.com/package/yt-dlp-wrap) package to implement a yt-dlp interface for generating direct video/audio URL from a video provider.

[yt-dlp supports ~1800 video providers](https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md), making it simple to grab a direct video link from almost any URL on the web.

### Youtube Search

* [Documentation](https://github.com/Zetaphor/cables-patches-ops/blob/main/content/yt-search/README.md)
* [Download Example Patch](https://github.com/Zetaphor/cables-patches-ops/blob/main/downloads/yt-search.zip?raw=true)

This op uses the [`yt-search`](https://www.npmjs.com/package/yt-search) package to implement a youtube search op without requring an API key.

### SerpAPI Google Image Search

* [Documentation](https://github.com/Zetaphor/cables-patches-ops/blob/main/content/serp-image-search/README.md)
* [Download Example Patch](https://github.com/Zetaphor/cables-patches-ops/blob/main/downloads/serp-image-search.zip?raw=true)

This op uses the [`serpapi`](https://www.npmjs.com/package/serpapi) package to implement a Google Image Search op using the [SerpAPI service](https://serpapi.com). It requires an API key, their free plan allows for 100 requests per month.

### SearXNG Image Search

* [Documentation](https://github.com/Zetaphor/cables-patches-ops/blob/main/content/searx-image-search/README.md)
* [Download Example Patch](https://github.com/Zetaphor/cables-patches-ops/blob/main/downloads/searx-image-search.zip?raw=true)

This op to implements image search using the [SearXNG API](https://docs.searxng.org/dev/search_api.html). [SearXNG](https://searxng.org/) is a self-hosted meta-search engine, so you will need to provide an instance URL. You can host SearXNG locally or use someone else's public instance. Note that you will the instance owner will need to have enabled the JSON output format in the SearXNG configuration as it's not there by default.

This is serves as an alternative to the SerpAPI image search op as it doesn't require an API key and has no rate limiting.

### Random Words Generator

* [Documentation](https://github.com/Zetaphor/cables-patches-ops/blob/main/content/random-words/README.md)
* [Download Example Patch](https://github.com/Zetaphor/cables-patches-ops/blob/main/downloads/random-words.zip?raw=true)

This op uses the [`niceware`](https://www.npmjs.com/package/niceware) package to implement a random words generator. The niceware package contains 65536 unique words. It supports string output with a separator and array output.

## Contributing

Issues, PRs, and feature requests are welcome. I'm also open to requests for implementations of other NPM packages.
