import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context)
    const {locale, renderPage} = context
    const sheet = new ServerStyleSheet()

    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    
    const styleTags = sheet.getStyleElement()

    return { 
      ...props,
      locale,
      ...page, 
      styleTags 
    }
  }

  render () {
    const polyfill = `https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${this.props.locale}`

    return (
      <html>
        <Head>
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <script src={polyfill} />
          <NextScript />
        </body>
      </html>
    )
  }
}