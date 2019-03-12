const c = require('ansi-colors')
const Blueprint = require('../blueprint')
const ask = require('../util/ask')
const selectModel = require('../util/select-model')
const chooseCategory = require('../util/choose-category')
const chooseRoles = require('../util/choose-roles')
const chooseFilename = require('../util/choose-filename')

async function addSearchDoc (options) {
  const blueprint = Blueprint.load(options)
  if (!blueprint) return

  const model = await selectModel(blueprint, options.modelPath)

  const label = await chooseLabelField(model.schema.properties)
  const description = await chooseDescriptionFields(model.schema.properties)

  const category = await chooseCategory(blueprint, model.name)

  const roles = await chooseRoles(
    blueprint,
    {
      suggested: '$everyone',
      includeBuiltIn: true
    }
  )

  const launches = await chooseLaunches(blueprint)

  const filename = await chooseFilename(
    'Search-doc filename',
    `${model.name}`
  )

  const scaffold = blueprint.scaffold
  scaffold.makeSearchDoc({
    namespace: blueprint.namespace,
    model: model.name,
    primaryKeys: model.schema.primaryKey,
    title: label,
    description: description,
    roles: roles,
    sort: label,
    category: category,
    launches: launches,
    filename: filename
  })
  console.log(c.bold(`\nCreating search-doc ${c.cyan(filename)}`))
  await scaffold.commit()
} // addSearchDoc

async function chooseLabelField (properties) {
  const fields = Object.entries(properties)
    .map(([p, v]) => {
      return {
        name: p,
        title: v.title || p
      }
    })

  const title = await ask({
    type: 'autocomplete',
    message: 'Select title field',
    choices: fields.map(f => f.title)
  })

  return fields.find(f => f.title === title).name
} // chooseLabelField

async function chooseDescriptionFields (properties) {
  const fields = Object.entries(properties)
    .map(([p, v]) => {
      return {
        name: p,
        title: v.title || p
      }
    })

  const description = await ask({
    type: 'autocomplete',
    multiple: true,
    message: 'Select description fields',
    choices: fields.map(f => f.title)
  })

  return description.map(d => fields.find(f => f.title === d).name)
} // chooseDescriptionFields

async function chooseLaunches (blueprint) {
  console.log()
  try {
    const stateMachines = blueprint.stateMachines()

    if (stateMachines.length === 0) {
      console.log(c.bold.red('Blueprint has no state-machines to scaffold launches against'))
      return []
    }

    if (stateMachines.length === 1) {
      const soloLaunch = await labelLaunch(stateMachines[0])
      return soloLaunch ? [soloLaunch] : []
    }

    const launches = []
    for await (const launch of gatherLaunch(stateMachines)) {
      launches.push(launch)
    }

    return launches
  } finally {
    console.log()
  }
} // chooseLaunches

async function labelLaunch (stateMachine) {
  console.log(c.bold(`Blueprint has one state machine - ${c.cyan(stateMachine.name)}`))
  const yes = await ask({
    type: 'confirm',
    message: 'Launch this state machine from the search?'
  })
  if (yes) {
    return {
      title: 'Open',
      stateMachine: stateMachine.machine
    }
  }
} // labelLaunch

async function * gatherLaunch (stateMachines) {
  console.log(c.bold('Launches'))

  const choices = stateMachines.map(sm => {
    return {
      name: sm.name,
      message: sm.description,
      value: sm.machine
    }
  })

  while (true) {
    const stateMachine = await ask({
      type: 'autocomplete',
      allowNone: true,
      message: 'State machine to launch',
      choices: choices
    })

    if (!stateMachine) {
      return
    }

    const title = await ask({
      message: 'Launch label'
    })

    yield {
      title,
      stateMachine
    }
  } // while (true)
} // gatherLaunch

module.exports = addSearchDoc
