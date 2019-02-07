const validator = require('../util/validators')
const ask = require('../util/ask')

async function labelDescription (
  labelSuggestion,
  descriptionSuggestion
) {
  const label = await ask({
    message: 'Label',
    initial: labelSuggestion,
    validate: validator.notEmpty()
  })
  const description = await ask({
    message: 'Description',
    initial: descriptionSuggestion
  })

  return {
    label,
    description
  }
} // labelDescription

module.exports = labelDescription
