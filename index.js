const { parse } = require('url')
const { join } = require('path')
const pathMatch = require('path-match')
const route = pathMatch()
const pathToRegexp = require('path-to-regexp')
const url = require('url')

function _defaultRoutes(additionRoutes) {
  return {
    ...additionRoutes,
    '/*': function({handle, req, res, parsedUrl}) {
      handle(req, res, parsedUrl)
    },
  }
}

const _nextRoutes = require.main.require('./now.dev.json');
function routesMiddleware({server, app}, defaultRoutes = _defaultRoutes, nextRoutes = _nextRoutes) {
  const dev = process.env.NODE_ENV !== 'production';

  let additionalRoutes = {}
  nextRoutes.routes.forEach(function(item) {
    additionalRoutes[item.src] = function({app, req, res, query}) {
      var re = pathToRegexp(item.src)
      const result = re.exec(req.url)
      if (result) {
        const slices = result.slice(1, result.length)
        let tmp = item.dest
        for(let i = 0; i < slices.length; i++) {
          tmp = tmp.replace(`$${i+1}`, slices[i])
        }
        const t = url.parse(tmp, true)
        const finalQuery = {...t.query, ...query}
        app.render(req, res, t.pathname, finalQuery)
      }
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