const validator = require('../util/validators')
const ask = require('../util/ask')
const _ = require('lodash')

async function nameLabelDescription (thing) {
  const name = await ask({
    message: `${thing} name`,
    validate: validator.notEmptyNoSpaces()
  })
  console.log()
  const label = await ask({
    message: 'Label',
    initial: _.upperFirst(_.lowerCase(name)),
    validate: validator.notEmpty()
  })
  const description = await ask({
    message: 'Description',
    initial: _.upperFirst(_.lowerCase(name))
  })

  return {
    name,
    label,
    description
  }
} // nameLabelDescription

module.exports = nameLabelDescription
