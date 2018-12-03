const stringInject = require('stringinject').default
const XRegExp = require('xregexp')

function mkLink(config) {
  const patterns = config.patterns
  const clientRoutes = config.routes.map(function(item) {
    let tmpSrc = item.src
    if (item.src.includes("${")) {
      tmpSrc = stringInject(item.src, patterns).replace(/\$/g, "")
    }
    return {
      src: tmpSrc,
      dest: item.dest,
    }
  })

  function getLink(link) {
    let res = '/'
    for(let i = 0; i < clientRoutes.length; i++) {
      const item = clientRoutes[i]
      const pattern = XRegExp(item.src)
      let result = XRegExp.exec(link, pattern)
      if (result) {
        const finalLink = XRegExp.replace(link, pattern, item.dest)//.toString().replace('undefined', '')
        res = finalLink
        break;
      }
    }
    return res
  }
  return getLink
}

module.exports = mkLink
