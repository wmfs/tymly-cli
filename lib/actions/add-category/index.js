const c = require('ansi-colors')
const Blueprint = require('../blueprint')
const validator = require('../util/validators')
const ask = require('../util/ask')
const _ = require('lodash')

async function addCategory (options) {
  const blueprint = Blueprint.load(options)
  if (!blueprint) return

  const categoryName = await ask({
    message: 'Category name',
    validate: validator.notEmptyNoSpaces()
  })
  console.log()
  const label = await ask({
    message: 'Label',
    initial: _.upperFirst(_.lowerCase(categoryName)),
    validate: validator.notEmpty()
  })
  const description = await ask({
    message: 'Description',
    initial: _.upperFirst(_.lowerCase(categoryName))
  })

  const scaffold = blueprint.scaffold
  scaffold.makeCategory({
    name: categoryName,
    label: label,
    description: description
  })
  console.log(c.bold(`\nCreating category ${c.cyan(categoryName)}`))
  await scaffold.commit()
}

module.exports = addCategory
