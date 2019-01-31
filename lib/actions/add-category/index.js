const c = require('ansi-colors')
const Blueprint = require('../blueprint')
const nameLabelDescription = require('../util/name-label-and-description')

async function addCategory (options) {
  const blueprint = Blueprint.load(options)
  if (!blueprint) return

  const { name, label, description } = await nameLabelDescription('Category')

  const scaffold = blueprint.scaffold
  scaffold.makeCategory({
    name: name,
    label: label,
    description: description
  })
  console.log(c.bold(`\nCreating category ${c.cyan(name)}`))
  await scaffold.commit()
}

module.exports = addCategory
