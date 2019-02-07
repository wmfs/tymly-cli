const c = require('ansi-colors')
const ask = require('./ask')

async function chooseRoles (blueprint, suggested = '$authenticated') {
  const roles = blueprint.roles()

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
    type: 'multiselect',
    message: 'Select roles',
    choices: [
      ...roles.map(r => r.label)
    ]
  })

  if (cats.length === 0) {
    const r = roles.find(r => r.name === suggested).label
    console.log(c.bold(`No roles chosen, defaulting to ${c.cyan(r)}`))
    cats.push(r)
  }

  return roles
    .filter(r => cats.includes(r.label))
    .map(r => r.name)
} // chooseRoles

module.exports = chooseRoles
