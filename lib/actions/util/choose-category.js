const c = require('ansi-colors')
const ask = require('./ask')

async function chooseCategory (blueprint, suggestion) {
  const categories = blueprint.categories()

  if (categories.length === 0) {
    console.log(c.bold.red('Blueprint has no categories defined'))
    return ask({
      message: 'Enter a category',
      initial: suggestion
    })
  }

  if (categories.length === 1) {
    console.log(c.bold(`Blueprint has one category - ${c.cyan(categories[0].label || categories[0].name)}`))
    return categories[0].name
  }

  const cat = await ask({
    type: 'autocomplete',
    message: 'Select a category',
    choices: categories.map(c => {
      return {
        name: c.name,
        message: c.label,
        hint: `${c.description} ${c.parent ? '(' + c.parent + ')' : ''}`,
        value: c.name
      }
    })
  })

  return cat
} // chooseCategories

module.exports = chooseCategory
