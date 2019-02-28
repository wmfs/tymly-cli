const ask = require('./ask')
const c = require('ansi-colors')

async function chooseFunction (blueprint, msg = 'Function to use') {
  const functions = blueprint.functions()

  if (functions.length === 0) {
    console.log(c.bold.red('Blueprint has no functions to scaffold against'))
    return
  }

  const noFn = 'No function'
  const choices = functions.map(m => {
    return {
      name: m.name,
      message: m.name,
      hint: `${m.parent ? '(' + m.parent + ')' : ''}`,
      value: m.name
    }
  })
  choices.unshift({
    name: noFn
  })

  const fnName = await ask({
    type: 'autocomplete',
    message: msg,
    choices: choices
  })

  return (fnName !== noFn)
    ? fnName
    : null
} // chooseFunction

module.exports = chooseFunction
