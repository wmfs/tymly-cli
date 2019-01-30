const c = require('ansi-colors')
const ask = require('../util/ask')
const Blueprint = require('../blueprint')
const Scaffold = require('@wmfs/tymly-scaffold')
const selectInternalModel = require('../util/select-model')
const chooseFilename = require('../util/choose-filename')
const _ = require('lodash')
const validate = require('../util/validators')

async function addStateMachine (options) {
  const blueprint = Blueprint.load(options)
  if (!blueprint) return

  const stateMachine = await selectMachine()
  if (!stateMachine) return
  const form = await selectForm(blueprint)
  if (!form) return
  const model = await selectModel(form, blueprint)
  if (!model) return
  const categories = await chooseCategories(blueprint)

  console.log()
  const filename = await chooseFilename('State machine filename', _.kebabCase(`${stateMachine}-${model}`))

  const scaffold = blueprint.scaffold
  scaffold.makeStateMachine({
    stateMachine: stateMachine,
    namespace: blueprint.namespace,
    modelName: model,
    categories: categories,
    formName: form.name,
    filename: filename
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

async function chooseCategories (blueprint) {
  const categories = blueprint.categories()

  if (categories.length === 0) {
    console.log(c.bold.red('Blueprint has no categories defined'))
    return ask({
      message: 'Please enter categories',
      hint: 'You can enter several categories, separated by commas',
      type: 'list'
    })
  }

  if (categories.length === 1) {
    console.log(c.bold(`Blueprint has one category - ${c.cyan(categories[0])}`))
    return categories
  }

  const cats = await ask({
    type: 'multiselect',
    message: 'Select categories',
    hint: '(Use <space> to select, <return> to submit)',
    choices: categories
  })

  return cats
} // chooseCategories

module.exports = addStateMachine
