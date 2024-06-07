# Zetaphor's Cables.gl Standalone Patches & Ops

This repository contains my custom patches and ops for the [Cables.gl](https://cables.gl) [standalone Electron app](https://github.com/cables-gl/cables_electron).

## Custom Ops

### Websocket Server

* [Documentation](https://github.com/Zetaphor/cables-patches-ops/blob/main/content/websocket-server/README.md)
* [Download](https://github.com/Zetaphor/cables-patches-ops/blob/main/downloads/websocket-server.zip?raw=true)

This op uses the [`ws`](https://www.npmjs.com/package/ws) package to implement a WebSocket server. This can be used to commuinicate with the browser, other cables patches, or native applications.

### OpenAI Client

* [Documentation](https://github.com/Zetaphor/cables-patches-ops/blob/main/content/openai-client/README.md)
* [Download](https://github.com/Zetaphor/cables-patches-ops/blob/main/downloads/openai-client.zip?raw=true)

This op uses the [`openai`](https://www.npmjs.com/package/openai) package to implement an OpenAI API client. It supports streaming responses and JSON mode.

### Groq Client

* [Documentation](https://github.com/Zetaphor/cables-patches-ops/blob/main/content/groq-client/README.md)
* [Download](https://github.com/Zetaphor/cables-patches-ops/blob/main/downloads/groq-client.zip?raw=true)

This op uses the [`groq-sdk`](https://www.npmjs.com/package/groq-sdk) package to implement a Groq API client. It supports streaming responses and JSON mode.

[Groq](https://groq.com/) offers a generous free tier for their API, and their inference speeds are 1000+ tokens/second.

## Contributing

Issues, PRs, and feature requests are welcome. I'm also open to requests for implementations of other NPM packages.
