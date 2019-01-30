const c = require('ansi-colors')
const ask = require('../../util/ask')
const Blueprint = require('../blueprint')
const Scaffold = require('@wmfs/tymly-scaffold')
const validator = require('../../util/validators')
const path = require('path')
const fs = require('fs-extra')
const _ = require('lodash')

async function addStateMachine (options) {
  const blueprint = Blueprint.load(options)
  if (!blueprint) return

  const stateMachine = await selectMachine()
  if (!stateMachine) return
  const form = await selectForm(blueprint)
  if (!form) return
  const model = await selectModel(form, blueprint)
  if (!model) return

  const scaffold = blueprint.scaffold
  const filename = scaffold.makeStateMachine({
    stateMachine: stateMachine,
    namespace: blueprint.namespace,
    modelName: model,
    formName: form.name
  })
  console.log(c.bold(`\nCreating ${c.cyan(filename)} state machine`))
  await scaffold.commit()
} // addStateMachine

async function selectMachine () {
  const machine = await ask({
    type: 'select',
    message: 'State machine to create',
    choices: Scaffold.StateMachines()
  })
  return machine
} // selectMachine

async function selectForm (blueprint) {
  const forms = blueprint.forms()

  if (forms.length === 0) {
    console.log(c.bold.red('Blueprint has no models to scaffold a form against'))
    return
  }

  if (forms.length === 1) {
    console.log(c.bold(`Blueprint has one form - ${c.cyan(forms[0].name)}`))
    return forms[0]
  }

  const formName = await ask({
    type: 'select',
    message: 'Update form',
    choices: forms.map(m => m.name)
  })

  return forms.find(m => m.name === formName)
} // selectForm

function selectModel (form, blueprint) {
  if (form.scaffold && form.scaffold.model) {
    return form.scaffold.model
  }
}

module.exports = addStateMachine
