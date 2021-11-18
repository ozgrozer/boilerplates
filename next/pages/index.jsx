/* eslint react/jsx-fragments: 0 */

import React from 'react'
import Head from 'next/head'

const Index = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Next App</title>
      </Head>

      <div>Hello World!</div>
    </React.Fragment>
  )
}

export default Index
