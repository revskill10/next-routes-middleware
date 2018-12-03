import React from 'react'
import Head from '../components/head'
import withIntl from '../lib/with-intl'
import { FormattedMessage, FormattedNumber, defineMessages } from 'react-intl'
import Layout from '../components/layout'

const { description } = defineMessages({
  description: {
    id: 'description',
    defaultMessage: 'An example app integrating React Intl with Next.js'
  }
})

const Home = (props) => {
  const { intl } = props

  return (
  <Layout>
    <Head>
      <meta name='description' content={intl.formatMessage(description)} />
    </Head>
    <p>
      <FormattedMessage id='greeting' defaultMessage='Hello, World!' />
    </p>
    <p>
      <FormattedNumber value={1000} />
    </p>
  </Layout>
)}

export default withIntl(Home)
