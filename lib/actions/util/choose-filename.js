const ask = require('./ask')
const validator = require('./validators')

async function chooseFilename (prompt, defaultFilename) {
  const suffix = '.json'
  const filenameQuestion = {
    message: prompt,
    initial: defaultFilename,
    validate: validator.notEmptyNoSpaces()
  }
  let filename = await ask(filenameQuestion)
  if (!filename.endsWith('.json')) {
    filename = `${filename}${suffix}`
  }
  return filename
} // chooseFilename

module.exports = chooseFilename
