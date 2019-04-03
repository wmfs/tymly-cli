const c = require('ansi-colors')
const Blueprint = require('../blueprint')
const validator = require('../util/validators')
const ask = require('../util/ask')
const labelAndDescription = require('../util/label-and-description')
const selectModel = require('../util/select-model')
const chooseCategory = require('../util/choose-category')
const chooseFilename = require('../util/choose-filename')
const _ = require('lodash')

async function makeForm (
  options,
  what,
  fileTag,
  preScaffoldFn = (m, f) => f
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
  const category = await chooseCategory(blueprint, model.name)

  const fields = await selectFields(simpleTitle, model.fields, model.schema.properties)
  const filename = await chooseFilename(
    `${_.upperFirst(what)} filename`,
    `${model.name}-${fileTag}`
  )

  const processedFields = preScaffoldFn(model, fields)

  const scaffold = blueprint.scaffold
  const makeFn = (what === 'form') ? scaffold.makeEditable : scaffold.makeViewable

  makeFn.bind(scaffold)({
    modelName: model.name,
    modelSchema: model.schema,
    title: label,
    category: category,
    description: description,
    fields: processedFields,
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
    initial: false
  })

  console.log()
  if (allProperties) {
    Object.entries(properties).forEach(([p, v]) => { v.title = suggestedTitle(p, v.title) })
    return null
  }

  const fields = []
  for (const property of propertyNames) {
    const title = suggestedTitle(property, properties[property].title)
    if (await ask({
      type: 'confirm',
      message: `Include ${title} (${property})?`,
      initial: true
    })) {
      fields.push(property)
      properties[property].title = await ask({
        message: 'Field title',
        initial: title,
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
  return makeForm(
    options,
    'form',
    'editing-form'
  )
} // addEditable

function addViewable (options) {
  return makeForm(
    options,
    'view',
    'view-form',
    (model, fields) => {
      Object.values(model.schema.properties)
        .forEach(p => { p.output = true })
      return fields
    }
  )
} // addViewable

function addTable (options) {
  return makeForm(
    options,
    'table',
    'table',
    (model, fields) => {
      const cols = fields || model.fields

      const tableName = `table-${model.name}`
      const table = {
        type: 'table',
        arrayPath: model.name,
        columns: cols,
        output: true
      }

      model.schema.properties[tableName] = table
      return [ tableName ]
    }
  )
} // addTable

module.exports = {
  addEditable,
  addViewable,
  addTable
}
