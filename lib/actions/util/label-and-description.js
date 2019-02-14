const validator = require('../util/validators')
const ask = require('../util/ask')

async function labelDescription (
  labelSuggestion,
  descriptionSuggestion,
  labelOrTitle = 'Label',
  prefix = ''
) {
  const label = await ask({
    message: `${prefix}${labelOrTitle}`,
    initial: labelSuggestion,
    validate: validator.notEmpty()
  })
  const description = await ask({
    message: `${prefix}Description`,
    initial: descriptionSuggestion
  })

  return {
    label,
    description
  }
} // labelDescription

module.exports = labelDescription
