const ask = require('./ask')
const c = require('ansi-colors')

async function selectInternalModel (blueprint) {
  const models = blueprint.models()

  if (models.length === 0) {
    console.log(c.bold.red('Blueprint has no models to scaffold against'))
    return
  }

  if (models.length === 1) {
    console.log(c.bold(`Blueprint has one model - ${c.cyan(models[0].schema.title || models[0].name)}`))
    return models[0]
  }

  const model = await ask({
    type: 'autocomplete',
    message: 'Model to scaffold against',
    choices: models.map(m => {
      return {
        name: m.name,
        message: m.schema.title || m.name,
        hint: `${m.schema.description} ${m.parent ? '(' + m.parent + ')' : ''}`,
        value: m.name
      }
    })
  })

  return models.find(m => m.name === model)
} // selectModel

module.exports = selectInternalModel
