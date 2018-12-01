## Next Routes Middleware

Extensible, customizable Next.JS routes middleware

## Installation

```
npm i --save next-routes-middleware
```

## Usage

Step 1: Create a default routes (`defaultRoutes.js`):

```js
function defaultRoutes(additionRoutes) {
  return {
    '/favicon.ico': function({app, req, res, join}) {
      const filePath = join(__dirname, '../static', 'favicon.ico')
      app.serveStatic(req, res, filePath)
    },
    ...additionRoutes,
    '/*': function({handle, req, res, parsedUrl}) {
      handle(req, res, parsedUrl)
    },
  }
}

module.exports = defaultRoutes
```

Step 2: Create your own `now.dev.json`:

```json

{
  "routes": [
    { "src": "/w/(.*)", "dest": "/work?slug=$1" },
    { "src": "/", "dest": "/index" }
  ]
}

```

Step 3: Using `next-routes-middleware` in your custom `server.js`

```js
const express = require('express')
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const routesMiddleware = require('next-routes-middleware')
const defaultRoutes = require('./defaultRoutes')
const nextRoutes = require('./now.dev.json')
const port = parseInt(process.env.PORT, 10) || 3000

app.prepare().then(() => {
  const server = express()
  routesMiddleware({server, handle, app, dev}, {defaultRoutes, nextRoutes})
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
```
