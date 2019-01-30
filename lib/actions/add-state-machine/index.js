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
  const form = await selectForm(blueprint)
  const model = await selectModel(form, blueprint)

  const scaffold = blueprint.scaffold
  const filename = scaffold.makeStateMachine({
    stateMachine: stateMachine,
    namespace: blueprint.namespace,
    modelName: model,
    formName: form
  })
  console.log(c.bold(`\nCreating ${c.cyan(filename)}`))
  await scaffold.commit()
} // addStateMachine

async function selectMachine () {
  const machine = await ask({
    type: 'select',
    message: 'State machine to create',
    choices: Scaffold.StateMachines()
  })
  return machine
}

function selectForm (blueprint) {
  return 'pizza-editing-form'
}

function selectModel (form, blueprint) {
  return 'pizza'
}

module.exports = addStateMachine
