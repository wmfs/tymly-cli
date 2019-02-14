const c = require('ansi-colors')
const ask = require('./ask')

async function chooseCategories (blueprint) {
  const categories = blueprint.categories()

  if (categories.length === 0) {
    console.log(c.bold.red('Blueprint has no categories defined'))
    return ask({
      message: 'Enter categories',
      hint: 'You can provide several categories, separated by commas',
      type: 'list'
    })
  }

  if (categories.length === 1) {
    console.log(c.bold(`Blueprint has one category - ${c.cyan(categories[0])}`))
    return categories
  }

  const cats = await ask({
    type: 'autocomplete',
    multiple: true,
    message: 'Select categories',
    choices: categories
  })

  return cats
} // chooseCategories

module.exports = chooseCategories
