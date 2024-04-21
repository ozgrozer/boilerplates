const mongoose = require('mongoose')

const schemas = require('./schemas')

module.exports = ({ model }) => {
  const necessarySchema = { createdAt: Number, updatedAt: Number }
  const combineSchemas = { ...necessarySchema, ...schemas[model] }
  const schema = mongoose.Schema(combineSchemas, { model })

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
    Model = mongoose.model(model)
  } catch (error) {
    Model = mongoose.model(model, schema)
  }
  return Model
}
