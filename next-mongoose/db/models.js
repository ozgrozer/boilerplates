const createModel = require('./createModel')

module.exports = {
  items: createModel({ collection: 'items' })
}
