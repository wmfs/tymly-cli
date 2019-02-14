const c = require('ansi-colors')
const Blueprint = require('../blueprint')
const validator = require('../util/validators')
const ask = require('../util/ask')
const labelAndDescription = require('../util/label-and-description')
const selectModel = require('../util/select-model')
const chooseFilename = require('../util/choose-filename')
const _ = require('lodash')

async function makeForm (
  options,
  what,
  fileTag,
  preScaffoldFn = () => { }
) {
  const blueprint = Blueprint.load(options)
  if (!blueprint) return

  const model = await selectModel(blueprint, options.modelPath)
  if (!model) return

  console.log()
  const simpleTitle = model.schema.title || _.upperFirst(model.name)
  const { label, description } =
    await labelAndDescription(
      `${simpleTitle} ${what === 'form' ? 'Editor' : 'Viewer'}`,
      `A form for ${what === 'form' ? 'editing' : 'viewing'} a ${simpleTitle}.`,
      'Title',
      'Form '
    )

  const fields = await selectFields(simpleTitle, model.fields, model.schema.properties)
  const filename = await chooseFilename(
    `${_.upperFirst(what)} filename`,
    `${model.name}-${fileTag}`
  )

  preScaffoldFn(model, fields)

  const scaffold = blueprint.scaffold
  const makeFn = (what === 'form') ? scaffold.makeEditable : scaffold.makeViewable

  makeFn.bind(scaffold)({
    modelName: model.name,
    modelSchema: model.schema,
    title: label,
    description: description,
    fields: fields,
    filename: filename
  })
  console.log(c.bold(`\nCreating ${c.cyan(filename)} ${what}`))
  await scaffold.commit()
} // addEditable

async function selectFields (modelName, propertyNames, properties) {
  console.log()
  const allProperties = await ask({
    type: 'confirm',
    message: `Include all the ${modelName} model's fields?`,
    initial: true
  })

  console.log()
  if (allProperties) {
    Object.entries(properties).forEach(([p, v]) => { v.title = suggestedTitle(p, v.title) })
    return null
  }

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
    console.log()
  }

  return fields
} // selectFields

function suggestedTitle (name, title) {
  if (title) return title
  return _.upperFirst(_.lowerCase(name))
}

function addEditable (options) {
  return makeForm(options, 'form', 'editing-form')
} // addEditable

function addViewable (options) {
  return makeForm(
    options,
    'view',
    'view-form',
    (model) =>
      Object.values(model.schema.properties).forEach(p => { p.output = true })
  )
} // addViewable

module.exports = {
  addEditable,
  addViewable
}
