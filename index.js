const { parse } = require('url')
const { join } = require('path')
const pathMatch = require('path-match')
const route = pathMatch()
const url = require('url')
var XRegExp = require('xregexp');
const fs = require('fs')

function name(str,replaceWhat,replaceTo){
  var re = new RegExp(replaceWhat, 'g');
  return str.replace(re,replaceTo);
}

function _defaultRoutes(additionRoutes) {
  return {
    ...additionRoutes,
    '*': function({handle, req, res}) {
      handle(req, res)
    },
  }
}

async function routesMiddleware({server, app, config, prefix = ""}, defaultRoutes = _defaultRoutes) {
  const dev = process.env.NODE_ENV !== 'production';
  
  let compiled = {
    ...config,
    builds: config.builds,
    routes: config.routes.map(function(item) {
      return {
        src: item.src,
        dest: name(name(item.dest, "\\${", "$"), "}", ""),
      }
    }),
  }

  fs.writeFile(
    'now.compiled.json',
    JSON.stringify(compiled, null, 2),
    function (err) {
      if (err) {
          console.error('Crap happens');
      }
    }
  );

  let additionalRoutes = {}
  config.routes.forEach(function(item) {
    additionalRoutes[item.src] = function({req, res, query, pattern, next, methods}) {
      if (item.build) {
        if (item.build === '@now/next') {    
          const resultUrl = XRegExp.replace(req.url, pattern, item.dest)
          const additionalParams = url.parse(resultUrl, true)
          const pathname = item.dest.split('?')[0]
          const finalQuery = {...additionalParams.query, ...query}
          app.render(req, res, pathname, finalQuery)
        } else if (item.build === '@now/static') {
          const filePath = item.dest
          app.serveStatic(req, res, filePath)
        }
      } else {
        return next()
      }
    }
  })

  const handle = app.getRequestHandler();
  const routes = defaultRoutes(additionalRoutes)
  const MobileDetect = require('mobile-detect')
  server.use(function(req, res, next) {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl
    const md = new MobileDetect(req.headers['user-agent']);
    const isMobile = md.mobile()
    const methods = [req.method]

    for(let item in additionalRoutes) {
      if (additionalRoutes.hasOwnProperty(item)) {
        const pattern = XRegExp(item)
        let result = XRegExp.exec(req.url, pattern)
        if (result) {
          return additionalRoutes[item]({
            req, res, next, handle, query, isMobile, join, dev, pattern, methods
          })          
        }
      }      
    }
    
    for (let k in routes) {
      if (routes.hasOwnProperty(k)) {
        const params = route(k)(pathname)
        if (params) {
          return routes[k]({app, req, res, next, handle, query, pathname, isMobile, join, params, dev, methods})
        }
      }
    }
  });
}

module.exports = routesMiddleware
