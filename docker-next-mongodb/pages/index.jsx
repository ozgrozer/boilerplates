import { MongoClient } from 'mongodb'

export default ({ data }) => {
  return (
    <div>
      <h1>MongoDB Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export async function getServerSideProps () {
  const client = await MongoClient.connect(process.env.MONGO_URL)
  const db = client.db()
  const collection = db.collection('example')
  const data = await collection.find({}).toArray()
  client.close()

  return {
    props: {
      data: JSON.parse(JSON.stringify(data))
    }
  }
}
