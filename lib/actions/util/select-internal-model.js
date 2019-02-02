const ask = require('./ask')
const c = require('ansi-colors')

async function selectInternalModel (blueprint) {
  const models = blueprint.models()

  if (models.length === 0) {
    console.log(c.bold.red('Blueprint has no models to scaffold against'))
    return
  }

  if (models.length === 1) {
    console.log(c.bold(`Blueprint has one model - ${c.cyan(models[0].name)}`))
    return models[0]
  }

  const modelName = await ask({
    type: 'select',
    message: 'Model to scaffold against',
    choices: models.map(m => m.name)
  })

  return models.find(m => m.name === modelName)
} // selectModel

module.exports = selectInternalModel
