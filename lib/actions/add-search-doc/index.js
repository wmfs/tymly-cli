const c = require('ansi-colors')
const Blueprint = require('../blueprint')
const ask = require('../util/ask')
const selectModel = require('../util/select-model')
const chooseCategory = require('../util/choose-category')
const chooseFilename = require('../util/choose-filename')

async function addSearchDoc (options) {
  const blueprint = Blueprint.load(options)
  if (!blueprint) return

  const model = await selectModel(blueprint, options.modelPath)

  const label = await chooseLabelField(model.schema.properties)
  const description = await chooseDescriptionFields(model.schema.properties)

  const category = await chooseCategory(blueprint, model.name)

  const filename = await chooseFilename(
    'Search-doc filename',
    `${model.name}`
  )

  const scaffold = blueprint.scaffold
  scaffold.makeSearchDoc({
    namespace: blueprint.namespace,
    model: model.name,
    primaryKeys: model.schema.primaryKey,
    title: label,
    description: description,
    roles: ['$everyone'],
    sort: label,
    category: category,
    launches: 'boop',
    filename: filename
  })
  console.log(c.bold(`\nCreating search-doc ${c.cyan(filename)}`))
  await scaffold.commit()
} // addSearchDoc

async function chooseLabelField (properties) {
  const fields = Object.entries(properties)
    .map(([p, v]) => {
      return {
        name: p,
        title: v.title || p
      }
    })

  const title = await ask({
    type: 'select',
    message: 'Select title field',
    choices: fields.map(f => f.title)
  })

  return fields.find(f => f.title === title).name
} // chooseLabelField

async function chooseDescriptionFields (properties) {
  const fields = Object.entries(properties)
    .map(([p, v]) => {
      return {
        name: p,
        title: v.title || p
      }
    })

  const description = await ask({
    type: 'multiselect',
    message: 'Select description fields',
    choices: fields.map(f => f.title)
  })

  return description.map(d => fields.find(f => f.title === d).name)
} // chooseLabelField

module.exports = addSearchDoc
