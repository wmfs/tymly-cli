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
  const fields = await selectFields(blueprint.modelPropertyNames(model))

  const scaffold = blueprint.scaffold
  scaffold.makeEditable({
    modelName: model,
    fields: fields
  })
  await scaffold.commit()
}

async function selectModel (models) {
  if (models.length === 1) {
    return models[0]
  }

  return ask({
    type: 'select',
    name: 'model',
    message: 'Model to scaffold against',
    choices: models
  })
} // selectModel

async function selectFields (propertyNames) {
  const allProperties = await ask({
    type: 'confirm',
    name: 'all',
    message: 'Include all fields?',
    initial: true
  })

  if (allProperties) {
    return null
  }

  const fields = []
  for (const property of propertyNames) {
    if (await ask({
      type: 'confirm',
      name: 'all',
      message: `Include ${property}?`,
      initial: true
    })) {
      fields.push(property)
    }
  }
  return fields
} // selectFields

async function ask (question) {
  const selection = await prompt(question)
  return selection[question.name]
}

module.exports = addEditable
