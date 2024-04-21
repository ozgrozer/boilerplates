const mongoose = require('mongoose')

const schemas = require('./schemas')

module.exports = ({ collection }) => {
  const necessarySchema = { createdAt: Number, updatedAt: Number }
  const combineSchemas = { ...necessarySchema, ...schemas[collection] }
  const schema = mongoose.Schema(combineSchemas, { collection })

  schema.pre('save', async function (next) {
    this.createdAt = Math.round(+new Date() / 1000)
    next()
  })

  schema.pre('updateOne', function () {
    const updatedAt = Math.round(+new Date() / 1000)
    this.update({}, { $set: { updatedAt } })
  })

  let Model
  try {
    Model = mongoose.model(collection)
  } catch (error) {
    Model = mongoose.model(collection, schema)
  }
  return Model
}
