const c = require('ansi-colors')
const Blueprint = require('../blueprint')
const validator = require('../util/validators')
const ask = require('../util/ask')
const selectInternalModel = require('../util/select-model')
const chooseFilename = require('../util/choose-filename')
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

  const fields = await selectFields(model.name, model.fields, model.schema.properties)
  const filename = await chooseFilename('Form filename', `${model.name}-editing-form`)

  const scaffold = blueprint.scaffold
  scaffold.makeEditable({
    modelName: model.name,
    modelSchema: model.schema,
    fields: fields,
    filename: filename
  })
  console.log(c.bold(`\nCreating ${c.cyan(filename)} form`))
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

async function selectFields (modelName, propertyNames, properties) {
  console.log()
  const allProperties = await ask({
    type: 'confirm',
    message: `Include all the ${modelName} model's fields?`,
    initial: true
  })

  if (allProperties) {
    Object.entries(properties).forEach(([p, v]) => { v.title = suggestedTitle(p, v.title) })
    return null
  }
  console.log()

  const fields = []
  for (const property of propertyNames) {
    if (await ask({
      type: 'confirm',
      message: `Include ${property}?`,
      initial: true
    })) {
      fields.push(property)
      properties[property].title = await ask({
        message: 'Field title',
        initial: suggestedTitle(property, properties[property].title),
        validate: validator.notEmpty()
      })
    }
  }

  console.log()

  return fields
} // selectFields

function suggestedTitle (name, title) {
  if (title) return title
  return _.upperFirst(_.lowerCase(name))
}

module.exports = addEditable
