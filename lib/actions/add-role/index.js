const c = require('ansi-colors')
const Blueprint = require('../blueprint')
const nameLabelDescription = require('../util/name-label-and-description')

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

function selectRoles (blueprint) {
  return []
} // selectRoles

module.exports = addRole
