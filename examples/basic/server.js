const express = require('express')
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const routesMiddleware = require('../../index')
const port = parseInt(process.env.PORT, 10) || 3000

app.prepare().then(() => {
  const server = express()
  routesMiddleware({server, app, dev})
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
