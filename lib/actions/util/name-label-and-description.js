const askName = require('./name')
const labelAndDescription = require('./label-and-description')
const _ = require('lodash')

async function nameLabelDescription (thing) {
  const name = await askName(thing)

  const suggestion = _.upperFirst(_.lowerCase(name))
  const { label, description } =
    await labelAndDescription(suggestion, suggestion)

  return {
    name,
    label,
    description
  }
} // nameLabelDescription

module.exports = nameLabelDescription
