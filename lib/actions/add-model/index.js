const c = require('ansi-colors')
const Scaffold = require('@wmfs/tymly-scaffold')

async function addModelAction (name, options) {
  const workingDirectory = options.path || '.'

  const modelName = name && name.trim()
  if (!modelName) {
    return
  }

  const scaffold = new Scaffold()
  scaffold.setBlueprint(workingDirectory)

  console.log(c.bold(`Adding ${c.cyan(modelName)} model to blueprint ${c.cyan(scaffold.blueprintName)}`))

  await scaffold.commit()
} // addModelAction

module.exports = addModelAction
