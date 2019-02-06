const c = require('ansi-colors')
const Blueprint = require('../blueprint')
const nameLabelDescription = require('../util/name-label-and-description')
const ask = require('../util/ask')

async function addRole (options) {
  const blueprint = Blueprint.load(options)
  if (!blueprint) return

  const { name, label, description } = await nameLabelDescription('Role')

  const memberOf = await selectRoles(blueprint)

  const scaffold = blueprint.scaffold
  scaffold.addRoleTemplate({
    name: name,
    label: label,
    description: description,
    roleMemberships: memberOf
  })
  console.log(c.bold(`\nCreating role ${c.cyan(name)}`))
  await scaffold.commit()
} // addRole

async function selectRoles (blueprint) {
  const roles = blueprint.roles(false)

  if (roles.length === 0) {
    console.log(c.bold('Blueprint has no roles defined'))
    return
  }

  const selectedRoles = await ask({
    type: 'multiselect',
    message: 'Roles this new role is a member of',
    hint: '(Use <space> to select, <return> to submit)',
    sort: true,
    choices: roles.map(m => m.label)
  })

  return roles
    .filter(r => selectedRoles.includes(r.label))
    .map(r => r.name)
} // selectRoles

module.exports = addRole
