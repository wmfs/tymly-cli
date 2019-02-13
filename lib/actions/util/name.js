const validator = require('../util/validators')
const ask = require('../util/ask')

async function askName (thing) {
  const name = await ask({
    message: `${thing} name`,
    validate: validator.notEmptyNoSpaces()
  })
  console.log()

  return name
} // nameLabelDescription

module.exports = askName
