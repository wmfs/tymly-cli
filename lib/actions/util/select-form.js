const ask = require('./ask')
const c = require('ansi-colors')

async function selectForm (blueprint) {
  const forms = blueprint.forms()

  if (forms.length === 0) {
    console.log(c.bold.red('Blueprint has no forms to build a state machine against'))
    return
  }

  if (forms.length === 1) {
    console.log(c.bold(`Blueprint has one form - ${c.cyan(forms[0].name)}`))
    return forms[0]
  }

  const formName = await ask({
    type: 'autocomplete',
    message: 'Update form',
    choices: forms.map(m => {
      return {
        name: m.name,
        message: m.description,
        hint: m.parent ? `(${m.parent})` : '',
        value: m.name
      }
    })
  })

  return forms.find(m => m.name === formName)
} // selectForm

module.exports = selectForm
