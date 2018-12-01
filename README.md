## Next Routes Middleware

Extensible, customizable Next.JS routes middleware

## Installation

```
npm i --save next-routes-middleware
```

## Usage

Step 1: Create your own `now.dev.json`:

```json

{
  "routes": [
    { "src": "/w/(.*)", "dest": "/work?slug=$1" },
    { "src": "/", "dest": "/index" }
  ]
}

```

Step 2: Using `next-routes-middleware` in your custom `server.js`

```js
const express = require('express')
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const routesMiddleware = require('next-routes-middleware')
const port = parseInt(process.env.PORT, 10) || 3000

app.prepare().then(() => {
  const server = express()
  routesMiddleware({server, app, dev})
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

```
