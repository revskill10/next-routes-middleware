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
    ...additionRoutes
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
const dotenv = require('dotenv')
dotenv.config()
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const routesMiddleware = require('next-routes-middleware')
const defaultRoutes = require('./defaultRoutes')
const nowRoutes = require('./now.dev.json')

app.prepare().then(async () => {
  routesMiddleware({server, handle, app, dev}, {defaultRoutes, nowRoutes})
  ...
}
```
