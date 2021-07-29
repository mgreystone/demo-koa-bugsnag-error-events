const Bugsnag = require('@bugsnag/js')
const BugsnagPluginKoa = require('@bugsnag/plugin-koa')
const Koa = require('koa')

if (!process.env.BUGSNAG_API_KEY) {
  console.error('Missing $BUGSNAG_API_KEY')
  process.exit(1)
}

Bugsnag.start({
  apiKey: process.env.BUGSNAG_API_KEY,
  plugins: [BugsnagPluginKoa]
})

const bugsnagKoaMiddleware = Bugsnag.getPlugin('koa')

const withoutBugsnag = new Koa()
withoutBugsnag.on('error', customLogger)
withoutBugsnag.use(handler)
withoutBugsnag.listen(3000)

const withBugsnag = new Koa()

withBugsnag.on('error', (err, ctx) => {
  customLogger(err, ctx)
  bugsnagKoaMiddleware.errorHandler(err, ctx)
})

withBugsnag.use(bugsnagKoaMiddleware.requestHandler)
withBugsnag.use(handler)
withBugsnag.listen(3001)

function handler () {
  throw new Error('oh no, something went wrong')
}

function customLogger (err, ctx) {
  console.error(`My Custom Logger: Error with ${ctx.req.method} ${ctx.req.url}`, err)
}
