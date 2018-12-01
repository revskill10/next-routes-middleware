function defaultRoutes(additionRoutes) {
  return {
    '/favicon.ico': function({app, req, res, join}) {
      const filePath = join(__dirname, './static', 'favicon.ico')
      app.serveStatic(req, res, filePath)
    },
    ...additionRoutes,
    '/*': function({handle, req, res, parsedUrl}) {
      handle(req, res, parsedUrl)
    },
  }
}

module.exports = defaultRoutes