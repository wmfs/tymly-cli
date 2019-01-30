const c = require('ansi-colors')
const { prompt } = require('enquirer')
const Blueprint = require('../blueprint')
const Scaffold = require('@wmfs/tymly-scaffold')
const validate = require('../util/validators')
const _ = require('lodash')

async function addModelAction (name, options) {
  const modelName = name && name.trim()
  if (!modelName) return

  const blueprint = Blueprint.load(options)
  if (!blueprint) return

  const scaffold = blueprint.scaffold

  console.log(c.bold(`Adding ${c.cyan(modelName)} model to blueprint ${c.cyan(blueprint.name)}`))
  console.log()

  const modelDetails = await gatherModelDetails(modelName)

  scaffold.addModel(modelDetails)
  console.log()
  console.log(c.bold(`Creating ${c.cyan(modelName)} model`))

  await scaffold.commit()
} // addModelAction

async function gatherModelDetails (modelName) {
  const modelHeader = await gatherModelHeader(modelName)
  const modelProperties = await gatherModelProperties()

  return {
    name: modelHeader.name,
    title: modelHeader.title,
    description: modelHeader.description,
    propertyHints: modelProperties
  }
} // gatherModelDetails

async function gatherModelHeader (modelName) {
  let modelHeader = {
    name: modelName
  }

  const questions = [
    {
      type: 'input',
      name: 'title',
      message: 'Model Title',
      initial: `${_.upperFirst(modelName)}`
    },
    {
      type: 'input',
      name: 'description',
      message: 'Model Description',
      initial: ''
    }
  ]

  for (const question of questions) {
    modelHeader = await prompt(question, {}, modelHeader)
  }

  console.log()
  return modelHeader
} // gatherModelHeader

async function gatherModelProperties () {
  const properties = []
  for await (const property of gatherModelProperty()) {
    properties.push(property)
  }
  return properties
} // gatherModelProperties

async function * gatherModelProperty () {
  console.log(c.bold('Model properties:'))
  while (true) {
    let propertyDetails = {}

    const questions = [
      {
        type: 'input',
        name: 'key',
        message: 'Property name (hit Enter to quit)',
        validate: validate.noSpaces('Spaces are not allowed in a property name')
      },
      {
        type: 'input',
        name: 'title',
        message: 'Property title',
        initial: () => `${_.upperFirst(_.lowerCase(propertyDetails.key))}`
      },
      {
        type: 'select',
        name: 'typeHint',
        message: 'Data type',
        choices: Scaffold.ModelTypes()
      },
      {
        type: 'confirm',
        name: 'primary',
        message: 'Is Primary Key',
        initial: false
      },
      {
        type: 'confirm',
        name: 'required',
        message: 'Is Required',
        initial: false
      }
    ]

    for (const question of questions) {
      propertyDetails = await prompt(question, {}, propertyDetails)

      if (!propertyDetails.key) {
        return
      }
    }

    // Strip empty string properties
    for (const [k, v] of Object.entries(propertyDetails)) {
      if (v === '') {
        delete propertyDetails[k]
      }
    }

    yield propertyDetails
  }
} // gatherModelProperty

module.exports = addModelAction
