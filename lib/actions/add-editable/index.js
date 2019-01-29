const c = require('ansi-colors')
const { prompt } = require('enquirer')
const Blueprint = require('../blueprint')
const validator = require('../../util/validators')
const path = require('path')
const fs = require('fs-extra')
const _ = require('lodash')

async function addEditable (options) {
  const blueprint = Blueprint.load(options)
  if (!blueprint) return

  const model = await selectModel(blueprint, options.modelPath)
  if (!model) {
    return
  }

  const fields = await selectFields(model.fields, model.schema.properties)
  const filename = await chooseFilename(`${model.name}-editing-form`)

  const scaffold = blueprint.scaffold
  scaffold.makeEditable({
    modelName: model.name,
    modelSchema: model.schema,
    fields: fields,
    filename: filename
  })
  await scaffold.commit()
} // addEditable

async function selectModel (blueprint, modelPath) {
  const model = modelPath ? loadExternalModel(modelPath) : await selectInternalModel(blueprint)

  return model
} // selectInternalModel

function loadExternalModel (modelPath) {
  if (!fs.pathExistsSync(modelPath)) {
    console.log(c.bold.red(`Can not find model at ${c.cyan(modelPath)}`))
  }

  const name = path.basename(modelPath, path.extname(modelPath))
  const schema = fs.readJsonSync(modelPath)
  const fields = Object.keys(schema.properties)
  console.log(c.bold(`Loading external model ${c.cyan(name)}`))
  return {
    name,
    schema,
    fields
  }
} // loadExternalModel

async function selectInternalModel (blueprint) {
  const models = blueprint.models()

  if (models.length === 0) {
    console.log(c.bold.red('Blueprint has no models to scaffold a form against'))
    return
  }

  if (models.length === 1) {
    console.log(c.bold(`Blueprint has one model - ${c.cyan(models[0].name)}`))
    return models[0]
  }

  const modelName = await ask({
    type: 'select',
    name: 'model',
    message: 'Model to scaffold against',
    choices: models.map(m => m.name)
  })

  return models.find(m => m.name === modelName)
} // selectModel

async function selectFields (propertyNames, properties) {
  const allProperties = await ask({
    type: 'confirm',
    name: 'all',
    message: 'Include all fields?',
    initial: true
  })

  if (allProperties) {
    Object.entries(properties).forEach(([p, v]) => v.title = suggestedTitle(p, v.title))
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
      properties[property].title = await ask({
        type: 'input',
        name: 'field',
        message: 'Field title',
        initial: suggestedTitle(property, properties[property].title),
        validate: validator.notEmpty()
      })
    }
  }
  return fields
} // selectFields

function suggestedTitle (name, title) {
  if (title) return title
  return _.upperFirst(_.lowerCase(name))
}

async function chooseFilename (defaultFilename) {
  const suffix = '.json'
  const filenameQuestion = {
    type: 'input',
    name: 'filename',
    message: 'Form filename',
    initial: defaultFilename,
    validate: validator.notEmptyNoSpaces()
  }
  let filename = await ask(filenameQuestion)
  if (!filename.endsWith('.json')) {
    filename = `${filename}${suffix}`
  }
  return filename
} // chooseFilename

async function ask (question) {
  const selection = await prompt(question)
  return selection[question.name]
} // ask

module.exports = addEditable
