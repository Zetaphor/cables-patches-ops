# Zetaphor's Cables.gl Standalone Patches & Ops

This repository contains my custom patches and ops for the [Cables.gl](https://cables.gl) [standalone Electron app](https://github.com/cables-gl/cables_electron).

## Websocket Server

* [Documentation](https://github.com/Zetaphor/cables-patches-ops/blob/main/content/websocket-server/README.md)
* [Download](https://github.com/Zetaphor/cables-patches-ops/blob/main/downloads/websocket-server.zip?raw=true)

This op uses the `ws` package from NodeJS to implement a WebSocket server. This can be used to commuinicate with the browser, other cables patches, or native applications.

## OpenAI Client

* [Documentation](https://github.com/Zetaphor/cables-patches-ops/blob/main/content/openai-client/README.md)
* [Download](https://github.com/Zetaphor/cables-patches-ops/blob/main/downloads/openai-client.zip?raw=true)

This op uses the `openai` package from NodeJS to implement an OpenAI API client. It supports streaming responses and JSON mode.

### Contributing

Issues, PRs, and feature requests are welcome. I'm also open to requests for implementations of other NPM packages.