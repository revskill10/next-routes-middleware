function defaultRoutes(additionRoutes) {
  return {
    ...additionRoutes,
    '/*': function({handle, req, res, parsedUrl}) {
      handle(req, res, parsedUrl)
    },
  }
}

module.exports = defaultRoutes
