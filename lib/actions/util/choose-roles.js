const c = require('ansi-colors')
const ask = require('./ask')

async function chooseRoles (
  blueprint,
  options = {
    includeBuiltIn: true
  }) {
  const suggested = options.suggested || '$authenticated'
  const roles = blueprint.roles(options.includeBuiltIn)

  if (roles.length === 0) {
    console.log(c.bold.red('Blueprint has no roles defined'))
    return ask({
      message: 'Enter roles',
      hint: 'You can provide several roles, separated by commas',
      type: 'list',
      initial: suggested
    })
  }

  const cats = await ask({
    type: 'autocomplete',
    multiple: true,
    message: options.message || 'Select roles',
    sort: true,
    choices: roles.map(r => {
      return {
        name: r.name,
        message: r.label,
        hint: `${r.description} ${r.parent ? '(' + r.parent + ')' : ''}`,
        value: r.name
      }
    })
  })

  if (cats.length === 0) {
    const r = roles.find(r => r.name === suggested)
    console.log(c.bold(`No roles chosen, defaulting to ${c.cyan(r.label || r.name)}`))
    cats.push(r.name)
  }

  return cats
} // chooseRoles

module.exports = chooseRoles
