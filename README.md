# demo-koa-bugsnag-error-events

Demonstration of how Bugsnag's Koa plugin is supressing application-level error events.

## To Use

```shell
yarn --frozen-lockfile
BUGSNAG_API_KEY=<Your api key> yarn start
```

This creates two Koa servers on ports 3000 & 3001. Both servers with throw an `Error`. Only port 3001 has bugsnag enabled. Make requests to these two services & note the different behavior in logging.

### Without Bugsnag

Error event is emitted, allowing us to perform additional error handling.

```
My Custom Logger: Error with GET / Error: oh no, something went wrong
    at handler (/demo-koa-bugsnag-error-events/index.js:30:9)
    at dispatch (/demo-koa-bugsnag-error-events/node_modules/koa-compose/index.js:42:32)
    at /demo-koa-bugsnag-error-events/node_modules/koa-compose/index.js:34:12
    at Application.handleRequest (/demo-koa-bugsnag-error-events/node_modules/koa/lib/application.js:168:12)
    at Server.handleRequest (/demo-koa-bugsnag-error-events/node_modules/koa/lib/application.js:150:19)
    at Server.emit (node:events:394:28)
    at Server.emit (node:domain:470:12)
    at parserOnIncoming (node:_http_server:924:12)
    at HTTPParser.parserOnHeadersComplete (node:_http_common:127:17)
```

### With Bugsnag

Error event is supressed, preventing us from performing additional error handling. Koa's default error handling is invoked.

```
[bugsnag] Loaded!

  Error: oh no, something went wrong
      at handler (/demo-koa-bugsnag-error-events/index.js:30:9)
      at dispatch (/demo-koa-bugsnag-error-events/node_modules/koa-compose/index.js:42:32)
      at requestHandler (/demo-koa-bugsnag-error-events/node_modules/@bugsnag/plugin-koa/dist/bugsnag-koa.js:108:15)
      at dispatch (/demo-koa-bugsnag-error-events/node_modules/koa-compose/index.js:42:32)
      at /demo-koa-bugsnag-error-events/node_modules/koa-compose/index.js:34:12
      at Application.handleRequest (/demo-koa-bugsnag-error-events/node_modules/koa/lib/application.js:168:12)
      at Server.handleRequest (/demo-koa-bugsnag-error-events/node_modules/koa/lib/application.js:150:19)
      at Server.emit (node:events:394:28)
      at Server.emit (node:domain:470:12)
      at parserOnIncoming (node:_http_server:924:12)
```
