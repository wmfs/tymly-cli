const validator = require('../util/validators')
const ask = require('../util/ask')
const labelAndDescription = require('./label-and-description')
const _ = require('lodash')

async function nameLabelDescription (thing) {
  const name = await ask({
    message: `${thing} name`,
    validate: validator.notEmptyNoSpaces()
  })
  console.log()

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
