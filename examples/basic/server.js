const express = require('express')
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const routesMiddleware = require('../../index')
const nextRoutes = require('./now.dev.json')
const port = parseInt(process.env.PORT, 10) || 3000

app.prepare().then(() => {
  const server = express()
  routesMiddleware({server, handle, app, dev}, {nextRoutes})
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})