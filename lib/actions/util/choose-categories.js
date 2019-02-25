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
    console.log(c.bold(`Blueprint has one category - ${c.cyan(categories[0].label || categories[0].name)}`))
    return categories.map(c => c.name)
  }

  const cats = await ask({
    type: 'autocomplete',
    multiple: true,
    message: 'Select categories',
    choices: categories.map(c => {
      return {
        name: c.name,
        message: c.label,
        hint: `${c.description} ${c.parent ? '(' + c.parent + ')' : ''}`,
        value: c.name
      }
    })
  })

  return cats
} // chooseCategories

module.exports = chooseCategories
