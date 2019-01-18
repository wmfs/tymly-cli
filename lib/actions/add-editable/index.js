const c = require('ansi-colors')
const { prompt } = require('enquirer')
const Blueprint = require('../blueprint')

async function addEditable (options) {
  const blueprint = Blueprint.load(options)
  if (!blueprint) return

  const models = blueprint.models()

  if (models.length === 0) {
    console.log(c.bold.red('Blueprint has no models to scaffold a form against'))
    return
  }
  const model = await selectModel(models)

  const scaffold = blueprint.scaffold
  scaffold.makeEditable({
    modelName: model
  })
  await scaffold.commit()
}

async function selectModel (models) {
  if (models.length === 1) {
    return models[0]
  }

  const question = {
    type: 'select',
    name: 'model',
    message: 'Model to scaffold against',
    choices: models
  }

  const selection = await prompt(question)
  return selection.model
} // selectModel

module.exports = addEditable
