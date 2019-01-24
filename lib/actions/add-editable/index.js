const c = require('ansi-colors')
const { prompt } = require('enquirer')
const Blueprint = require('../blueprint')
const validator = require('../../util/validators')
const path = require('path')
const fs = require('fs-extra')

async function addEditable (options) {
  const blueprint = Blueprint.load(options)
  if (!blueprint) return

  const model = await selectModel(blueprint, options.modelPath)
  if (!model) {
    return
  }

  const fields = await selectFields(model.fields)
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
  if (modelPath) {
    return loadExternalModel(modelPath)
  }

  return selectInternalModel(blueprint)
} // selectInternalModel

function loadExternalModel (modelPath) {
  if (!fs.pathExistsSync(modelPath)) {
    console.log(c.bold.red(`Can not find model at ${c.cyan(modelPath)}`))
  }

  const name = path.basename(modelPath, path.extname(modelPath))
  const schema = fs.readJsonSync(modelPath)
  const fields = schema.properties
  console.log(c.bold(`Loading model ${c.cyan(name)}`))
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
