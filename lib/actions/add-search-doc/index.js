const c = require('ansi-colors')
const Blueprint = require('../blueprint')
const selectModel = require('../util/select-model')
const chooseCategory = require('../util/choose-category')
const chooseFilename = require('../util/choose-filename')

async function addSearchDoc (options) {
  const blueprint = Blueprint.load(options)
  if (!blueprint) return

  const model = await selectModel(blueprint, options.modelPath)

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
    title: 'washboard',
    description: ['phonic'],
    roles: ['$everyone'],
    sort: 'label',
    category: category,
    launches: 'boop',
    filename: filename
  })
  console.log(c.bold(`\nCreating search-doc ${c.cyan(filename)}`))
  await scaffold.commit()
} // addSearchDoc

module.exports = addSearchDoc
