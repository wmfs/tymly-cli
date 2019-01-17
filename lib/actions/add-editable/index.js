const c = require('ansi-colors')
const Scaffold = require('@wmfs/tymly-scaffold')
const Blueprint = require('../blueprint')

async function addEditable (options) {
  const workingDirectory = options.path || '.'

  const blueprint = Blueprint.load(workingDirectory)

  const scaffold = new Scaffold()
  scaffold.setBlueprintDir(workingDirectory)

  const models = blueprint.models()

  if (models.length === 0) {
    console.log(c.red('Blueprint has no models to scaffold a form against'))
    return
  }
  const model = selectModel(models)

  scaffold.makeEditable({
    modelName: model
  })
  await scaffold.commit()
}

function selectModel (models) {
  if (models.length === 1) {
    return models[0]
  }
}

module.exports = addEditable
