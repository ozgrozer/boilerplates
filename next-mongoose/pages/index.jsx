import axios from 'axios'
import Head from 'next/head'
import { useEffect } from 'react'

const readItems = async () => {
  try {
    const apiResult = await axios({
      method: 'post',
      url: '/api/read-items'
    })
    console.log(apiResult.data)
  } catch (err) {
    console.log(err.message)
  }
}

export default () => {
  useEffect(() => {
    readItems()
  }, [])

  return (
    <>
      <Head>
        <title>Next App</title>
      </Head>

      <div>Hello World!</div>
    </>
  )
}
