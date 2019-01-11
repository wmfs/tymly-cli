const colour = require('../../util/colour')

function initAction (blueprintName, options) {
  if (!blueprintName) {
    return
  }

  const workingDirectory = options.path || '.'
  console.log(`Creating blueprint ${colour.cyan(blueprintName)} in ${workingDirectory}`)
}

module.exports = initAction
