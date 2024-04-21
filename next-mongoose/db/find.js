const models = require('./models')

module.exports = async ({ model }) => {
  const Model = models[model]
  return await Model.find()
}
