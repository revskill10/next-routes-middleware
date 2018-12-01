const { parse } = require('url')
const { join } = require('path')
const pathMatch = require('path-match')
const route = pathMatch()
const url = require('url')
var XRegExp = require('xregexp');
const stringInject = require('stringinject').default

function _defaultRoutes(additionRoutes) {
  return {
    ...additionRoutes,
    '*': function({handle, req, res}) {
      handle(req, res)
    },
  }
}

const _nextRoutes = require.main.require('./now.dev.json');
function routesMiddleware({server, app}, defaultRoutes = _defaultRoutes, nextRoutes = _nextRoutes) {
  const dev = process.env.NODE_ENV !== 'production';
  const patterns = nextRoutes.patterns
  const modifiedRoutes = nextRoutes.routes.map(function(item) {
    const tmpSrc = stringInject(item.src, patterns).replace(/\$/g, "")
    return {
      src: tmpSrc,
      dest: item.dest
    }
  })
  let additionalRoutes = {}
  modifiedRoutes.forEach(function(item) {
    additionalRoutes[item.src] = function({app, req, res, query, pattern}) {
      const resultUrl = XRegExp.replace(req.url, pattern, item.dest)
      const additionalParams = url.parse(resultUrl, true)
      const pathname = item.dest.split("?")[0]
      const finalQuery = {...additionalParams.query, ...query}
      app.render(req, res, pathname, finalQuery)
    }
  })

  const handle = app.getRequestHandler();
  const routes = defaultRoutes(additionalRoutes)
  const MobileDetect = require('mobile-detect')
  server.get('*', (req, res, next) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl
    const md = new MobileDetect(req.headers['user-agent']);
    const isMobile = md.mobile()

    for(let item in additionalRoutes) {
      if (additionalRoutes.hasOwnProperty(item)) {
        const pattern = XRegExp(item)
        let result = XRegExp.exec(req.url, pattern)
        if (result) {
          return additionalRoutes[item]({
            app, req, res, next, handle, query, isMobile, join, dev, pattern
          })          
        }
      }      
    }
    
    for (let k in routes) {
      if (routes.hasOwnProperty(k)) {
        const params = route(k)(pathname)
        if (params) {
          return routes[k]({app, req, res, next, handle, query, pathname, isMobile, join, params, dev})
        }
      }
    }
  });
}

module.exports = routesMiddleware
