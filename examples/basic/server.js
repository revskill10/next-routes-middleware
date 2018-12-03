const express = require('express')
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const routesMiddleware = require('../../index')
const port = parseInt(process.env.PORT, 10) || 3000
const config = require('./now.dev.json')
app.prepare().then(() => {
  const server = express()
  const prefix = ""
  routesMiddleware({server, app, config, prefix})
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
