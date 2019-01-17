const c = require('ansi-colors')
const { prompt } = require('enquirer')
const Scaffold = require('@wmfs/tymly-scaffold')

async function addModelAction (name, options) {
  const workingDirectory = options.path || '.'

  const modelName = name && name.trim()
  if (!modelName) {
    return
  }

  const scaffold = new Scaffold()
  scaffold.setBlueprintDir(workingDirectory)

  console.log(c.bold(`Adding ${c.cyan(modelName)} model to blueprint ${c.cyan(scaffold.blueprintName)}`))

  const modelDetails = await gatherModelDetails(modelName)

  scaffold.addModel(modelDetails)

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
      message: 'Title',
      initial: `${modelName[0].toUpperCase()}${modelName.substring(1)}`
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description',
      initial: ''
    }
  ]

  for (const question of questions) {
    modelHeader = await prompt(question, {}, modelHeader)
  }

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
        message: 'Property name (hit Enter to quit)'
      },
      {
        type: 'select',
        name: 'typeHint',
        message: 'Property type',
        choices: Scaffold.ModelTypes()
      },
      {
        type: 'confirm',
        name: 'primary',
        message: 'Primary Key',
        initial: false
      },
      {
        type: 'confirm',
        name: 'required',
        message: 'Required',
        initial: false
      }
    ]

    for (const question of questions) {
      propertyDetails = await prompt(question, {}, propertyDetails)

      if (!propertyDetails.key) {
        return
      }
    }
    yield propertyDetails
  }
} // gatherModelProperty

module.exports = addModelAction
