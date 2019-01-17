const c = require('ansi-colors')
const Blueprint = require('../blueprint')

async function addEditable (options) {
  const blueprint = Blueprint.load(options)

  const models = blueprint.models()

  if (models.length === 0) {
    console.log(c.red('Blueprint has no models to scaffold a form against'))
    return
  }
  const model = selectModel(models)

  const scaffold = blueprint.scaffold
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
