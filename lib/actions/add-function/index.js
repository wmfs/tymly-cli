const c = require('ansi-colors')
const Blueprint = require('../blueprint')
const askName = require('../util/name')

async function addFunction (options) {
  const blueprint = Blueprint.load(options)
  if (!blueprint) return

  const name = await askName('Function')

  const scaffold = blueprint.scaffold
  scaffold.makeFunction({
    name
  })
  console.log(c.bold(`\nScaffolding function skeleton ${c.cyan(name)}`))
  await scaffold.commit()
} // addFunction

module.exports = addFunction
