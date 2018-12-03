const IntlPolyfill = require('intl')
Intl.NumberFormat = IntlPolyfill.NumberFormat
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat
const dev = process.env.NODE_ENV !== 'production'
const {readFileSync} = require('fs')
const {basename} = require('path')
const accepts = require('accepts')
const glob = require('glob')
const {inspect} = require('util')
// Get the supported languages by looking for translations in the `lang/` dir.
const supportedLanguages = ['en','fr']//glob.sync('../lang/*.json').map((f) => basename(f, '.json'))
/*
// We need to expose React Intl's locale data on the request for the user's
// locale. This function will also cache the scripts by lang in memory.
const localeDataCache = new Map()
const getLocaleDataScript = (locale) => {
  const lang = locale.split('-')[0]
  console.log(lang)
  if (!localeDataCache.has(lang)) {
    const localeDataFile = require.resolve(`react-intl/locale-data/${lang}`)
    const localeDataScript = readFileSync(localeDataFile, 'utf8')
    localeDataCache.set(lang, localeDataScript)
  }
  const tmp = localeDataCache.get(lang)
  return tmp
}
*/
// We need to load and expose the translations on the request for the user's
// locale. These will only be used in production, in dev the `defaultMessage` in
// each message description in the source code will be used.
const getMessages = (locale) => {
  return require(`../lang/${locale}.json`)
}

function initI18n(ctx) {
  const {req} = ctx
  if (req) {
    const accept = accepts(req)
    const locale = accept.language(accept.languages(supportedLanguages)) || 'fr'
    ctx.locale = locale
    //ctx.localeDataScript = getLocaleDataScript(locale)
    ctx.messages = dev ? {} : getMessages(locale)
  } 
}

module.exports = {
  initI18n,
  getMessages,
}