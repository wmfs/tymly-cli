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

  if (roles.length === 1) {
    console.log(c.bold(`Blueprint has one role - ${c.cyan(roles[0])}`))
    return roles
  }

  const cats = await ask({
    type: 'multiselect',
    message: 'Select roles',
    choices: [
      '$everyone',
      '$authenticated',
      ...roles
    ]
  })

  return cats
} // chooseRoles

module.exports = chooseRoles
