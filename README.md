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
    { 
      "src": "/w/(.*)", 
      "dest": "/work?slug=$1" 
    },
    { 
      "src": "/resource/(?<id>[^/]*)", 
      "dest": "/complex?id=${id}" 
    },
    { 
      "src": "/t/(?<slug>[^/]*)/(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})", 
      "dest": "/more_complex?day=${day}&month=${month}&year=${year}&slug=${slug}" 
    },
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
  routesMiddleware({server, app})
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

```

## Customization and Overriding Routes

Suppose you want to do something else beyond rendering, you can provide custom routes handler like this

`customRoutes.js`
```js

function customRoutes(nextRoutes) {
  return {
    '/service-worker.js': function({app, req, res, join, dev}) {
      const filePath = dev ? join(__dirname, '../static', 'service-worker.dev.js'): join(__dirname, '../static', 'service-worker.js')
      app.serveStatic(req, res, filePath)
    },
    '/favicon.ico': function({app, req, res, join}) {
      const filePath = join(__dirname, '../static', 'favicon.ico')
      app.serveStatic(req, res, filePath)
    },
    '/static/wasm/*': function({app, req, res, next, handle, pathname}) {
      res.setHeader('Content-Type', 'application/wasm')
      handle(req, res, parsedUrl)
    },    
    '/': function({app, req, res, isMobile, query}) {
      if (!isMobile) {
        app.render(req, res, '/index', {phone: false, ...query })
      } else {
        app.render(req, res, '/index', {phone: true, ...query})
      }
    },    
    ...nextRoutes,
    '*': function({handle, req, res, parsedUrl}) {
      handle(req, res, parsedUrl)
    },
  }
}

module.exports = customRoutes
```

Then use in your custom `server.js`

```js
const customRoutes = require('./customRoutes')
routesMiddleware({server, app}, customRoutes)
```

## Usage with next/link and styled-components for client-side routing


```js
import Link from 'next/link'
import styled from 'styled-components'

const NavBarLink = styled.a`
 text-decoration: none;
 color: rgb(209, 72, 54);
`

<Link as={`/w/test`} href={`/work?slug=test`}>
  <NavBarLink>WORK</NavBarLink>
</Link>
```
