const XRegExp = require('xregexp')

function mkLink(config) {
  const clientRoutes = config.routes

  function getLink(link) {
    let res = '/'
    for(let i = 0; i < clientRoutes.length; i++) {
      const item = clientRoutes[i]
      const pattern = XRegExp(item.src)
      let result = XRegExp.exec(link, pattern)
      if (result) {
        const finalLink = XRegExp.replace(link, pattern, item.dest)
        res = finalLink
        break;
      }
    }
    return res
  }
  return getLink
}

module.exports = mkLink
