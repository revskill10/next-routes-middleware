import React, {Component} from 'react'
import {FormattedRelative} from 'react-intl'
import Layout from '../components/layout'
import {inspect} from 'util'
class About extends Component {
  

  render () {
    const someDate = new Date()
    return (
      <Layout>
        <p>
          <FormattedRelative
            value={someDate}
            updateInterval={1000}
          />
        </p>
        WTF
      </Layout>
    )
  }
}

export default About