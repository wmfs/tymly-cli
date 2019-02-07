const c = require('ansi-colors')
const Blueprint = require('../blueprint')
const validator = require('../util/validators')
const ask = require('../util/ask')
const selectModel = require('../util/select-model')
const chooseFilename = require('../util/choose-filename')
const _ = require('lodash')

async function addViewable (options) {
  const blueprint = Blueprint.load(options)
  if (!blueprint) return

  const model = await selectModel(blueprint, options.modelPath)
  if (!model) {
    return
  }

  const fields = await selectFields(model.name, model.fields, model.schema.properties)
  const filename = await chooseFilename('Form filename', `${model.name}-view-form`)

  Object.values(model.schema.properties).forEach(p => { p.output = true })

  const scaffold = blueprint.scaffold
  scaffold.makeViewable({
    modelName: model.name,
    modelSchema: model.schema,
    fields: fields,
    filename: filename
  })
  console.log(c.bold(`\nCreating ${c.cyan(filename)} view`))
  await scaffold.commit()
} // addViewable

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

module.exports = addViewable
