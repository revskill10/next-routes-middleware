import App, { Container } from 'next/app'
import React from 'react'
import {  IntlProvider } from "../lib/intl-context";
/*
import { addLocaleData } from "react-intl";
// Register React Intl's locale data for the user's locale in the browser. This
// locale data was added to the page by `pages/_document.js`. This only happens
// once, on initial page load in the browser.
if (typeof window !== 'undefined' && window.ReactIntlLocaleData) {
  Object.keys(window.ReactIntlLocaleData).forEach((lang) => {
    addLocaleData(window.ReactIntlLocaleData[lang])
  })
}
*/
export default class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    

    const { req } = ctx
    if (req) {
      const {initI18n} = await import('../lib/util')
      initI18n(ctx)
    } 

    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    if (req) {
      const { locale, messages } = ctx

      // Get the `locale` and `messages` from the request object on the server.
      // In the browser, use the same values that the server serialized.

      return { pageProps, locale, messages }
    } else {
      const { locale, messages } = window.__NEXT_DATA__.props
    
      // Get the `locale` and `messages` from the request object on the server.
      // In the browser, use the same values that the server serialized.
      
      

      return { pageProps, locale, messages }
    }
    
  }


  render () {
    const { Component, pageProps, locale, messages } = this.props
    const now = Date.now()

    return (
      <Container>
        <IntlProvider locale={locale} messages={messages} initialNow={now}>
          <Component {...pageProps} />
        </IntlProvider>
      </Container>
    )
  }
}