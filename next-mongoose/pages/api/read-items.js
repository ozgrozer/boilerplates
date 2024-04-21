import { find } from './../../db/db'
import connectDb from './../../db/connectDb'

export default async (req, res) => {
  await connectDb()

  const items = await find({
    model: 'items'
  })

  res.json({ success: true, items })
}
