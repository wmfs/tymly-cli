const c = require('ansi-colors')
const ask = require('../util/ask')
const Blueprint = require('../blueprint')
const Scaffold = require('@wmfs/tymly-scaffold')
const labelAndDescription = require('../util/label-and-description')
const selectInternalModel = require('../util/select-model')
const chooseCategories = require('../util/choose-categories')
const chooseRoles = require('../util/choose-roles')
const chooseFilename = require('../util/choose-filename')
const _ = require('lodash')

async function addStateMachine (options) {
  const blueprint = Blueprint.load(options)
  if (!blueprint) return

  const stateMachine = await selectMachine()
  if (!stateMachine) return

  console.log()
  const form = await selectForm(blueprint)
  if (!form) return
  const model = await selectModel(form, blueprint)
  if (!model) return

  console.log()
  const { label, description } =
      await labelAndDescription(
        `${_.upperFirst(stateMachine)} ${model}`,
        `${_.upperFirst(stateMachine)} ${model} using ${form.name} form.`
      )

  const categories = await chooseCategories(blueprint)

  const roles = await chooseRoles(blueprint)

  const machineOptions = await chooseMachineOptions(stateMachine)

  console.log()
  const filename = await chooseFilename('State machine filename', _.kebabCase(`${stateMachine}-${model}`))

  const scaffold = blueprint.scaffold
  scaffold.makeStateMachine({
    label: label,
    description: description,
    stateMachine: stateMachine,
    namespace: blueprint.namespace,
    modelName: model,
    categories: categories,
    roles: roles,
    formName: form.name,
    filename: filename,
    reindex: machineOptions.reindex,
    presaveFn: machineOptions.presaveFn
  })
  console.log(c.bold(`\nCreating ${c.cyan(filename)} state machine`))
  await scaffold.commit()
} // addStateMachine

async function selectMachine () {
  const stateMachines = Scaffold.StateMachines()

  const machine = await ask({
    type: 'autocomplete',
    message: 'State machine to create',
    choices: stateMachines.map(s => {
      return {
        name: s.name,
        message: s.label,
        hint: `${s.parent ? '(' + s.parent + ')' : ''}`,
        value: s.name
      }
    })
  })

  return machine
} // selectMachine

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
    choices: forms.map(m => m.name)
  })

  return forms.find(m => m.name === formName)
} // selectForm

async function selectModel (form, blueprint) {
  if (form.meta && form.meta.data && form.meta.data.modelName) {
    return form.meta.data.modelName
  }

  const model = await selectInternalModel(blueprint)
  if (model) return model.name

  return ask({
    message: 'Can\'t determine model. Please provide model name'
  })
} // selectModel

async function chooseMachineOptions (stateMachine) {
  const machine = Scaffold.StateMachines().find(m => m.name === stateMachine)

  const reindex = machine.reindex &&
    await ask({
      type: 'confirm',
      message: 'Reindex after save?'
    })

  const presaveFn = machine.presaveFn

  return {
    reindex,
    presaveFn
  }
} // machine

module.exports = addStateMachine
