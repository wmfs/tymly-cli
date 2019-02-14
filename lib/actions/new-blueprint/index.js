const c = require('ansi-colors')
const { prompt } = require('enquirer')
const path = require('path')
const fs = require('fs')
const loadProfile = require('../profile')
const Scaffold = require('@wmfs/tymly-scaffold')
const ask = require('../util/ask')
const validate = require('../util/validators')

async function newBlueprint (name, options) {
  const workingDirectory = options.path || '.'

  const blueprintName = name && name.trim()
  if (!blueprintName) {
    return
  }

  const targetDirectory = path.join(workingDirectory, blueprintName)

  console.log(c.bold(`\nNew blueprint ${c.cyan(blueprintName)}\n`))
  if (!canCreate(targetDirectory)) {
    console.log(c.redBright('Target directory already exists. Bailing out.'))
    return
  }

  const profile = loadProfile(options.profile)
  const blueprintInfo = await solicitDetails(blueprintName, profile)

  const scaffold = new Scaffold({
    basePath: workingDirectory
  })
  scaffold.addBlueprint(blueprintInfo)
  await scaffold.commit()

  console.log(c.bold(`Creating blueprint in ${targetDirectory}`))
} // initAction

function canCreate (blueprintPath) {
  try {
    fs.statSync(blueprintPath)
    return false
  } catch (e) {
    return true
  }
} // canCreate

async function solicitDetails (blueprintName, profile) {
  let blueprintInfo = {
    name: blueprintName
  }

  const allDetails = [
    blueprintDetails,
    domainDetails,
    authorDetails,
    buildDetails
  ]
  for (const details of allDetails) {
    blueprintInfo = await details(blueprintInfo, profile)
    console.log()
  }

  return blueprintInfo
} // solicitDetails

async function blueprintDetails (blueprintInfo, profile) {
  const questions = [
    {
      type: 'input',
      name: 'namespace',
      message: 'Blueprint namespace',
      initial: profile.gitHubOwnerSuggestion(profile.organisationSuggestion()),
      validate: validate.notEmptyNoSpaces('Please provide a namespace')
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description'
    }
  ]

  return askAll(blueprintInfo, questions)
} // blueprintDetails

async function domainDetails (blueprintInfo, profile) {
  const domains = Scaffold.TypeDomains()
  const defaultDomains = domains
    .filter(d => d.default)
    .map(d => d.name)

  const chosenDomains = await ask({
    type: 'autocomplete',
    multiple: true,
    message: 'What kind of data will this blueprint work with?',
    initial: defaultDomains,
    choices: domains.map(d => {
      return {
        name: d.name,
        message: d.title,
        hint: d.description,
        value: d.name
      }
    })
  })

  blueprintInfo.meta = {
    domains: chosenDomains
  }

  return blueprintInfo
} // domainDetails

async function authorDetails (blueprintInfo, profile) {
  const questions = [
    {
      type: 'input',
      name: 'author',
      message: 'Author',
      initial: () => profile.authorSuggestion()
    },
    {
      type: 'input',
      name: 'organisation',
      message: 'Organisation',
      initial: () => profile.organisationSuggestion()
    }
  ]

  return askAll(blueprintInfo, questions)
} // authorDetails

async function buildDetails (blueprintInfo, profile) {
  blueprintInfo.license = await ask({
    message: 'License',
    initial: 'MIT'
  })
  blueprintInfo.gitHubOwner = await ask({
    message: 'GitHub Owner',
    initial: () => profile.gitHubOwnerSuggestion(blueprintInfo.organisation),
    validate: validate.noSpaces('No spaces allowed in GitHub Owner name')
  })
  blueprintInfo.npmOrg = await ask({
    message: 'NPM Organisation',
    initial: () => profile.npmOrgSuggestion(blueprintInfo.gitHubOwner),
    validate: validate.noSpaces('No spaces allowed in NPM Organisation name')
  })
  blueprintInfo.semanticVersioning = await ask({
    type: 'confirm',
    message: 'Use Semantic Versioning',
    initial: true
  })
  blueprintInfo.ciProfile = await ask({
    type: 'autocomplete',
    message: 'CI Profile',
    initial: 'travis',
    choices: [
      'travis',
      'None'
    ]
  })

  return blueprintInfo
} // buildDetails

async function askAll (blueprintInfo, questions) {
  for (const question of questions) {
    blueprintInfo = await prompt(question, {}, blueprintInfo)
  }

  return blueprintInfo
} // askAll

module.exports = newBlueprint
