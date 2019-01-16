const c = require('ansi-colors')
const { prompt } = require('enquirer')
const path = require('path')
const fs = require('fs')
const loadProfile = require('../profile')
const Scaffold = require('@wmfs/tymly-scaffold')

async function newBlueprint (name, options) {
  const workingDirectory = options.path || '.'

  const blueprintName = name && name.trim()
  if (!blueprintName) {
    return
  }

  const targetDirectory = path.join(workingDirectory, blueprintName)

  console.log(c.bold(`Creating blueprint ${c.cyan(blueprintName)} in ${targetDirectory}`))
  if (!canCreate(targetDirectory)) {
    console.log(c.redBright('Target directory already exists. Bailing out.'))
    return
  }

  const profile = loadProfile(options.profile)
  const blueprintInfo = await solicitDetails(profile)

  const scaffold = new Scaffold({
    basePath: workingDirectory
  })
  scaffold.addBlueprint({
    name: blueprintName,
    description: blueprintInfo.description,
    author: blueprintInfo.author,
    organisation: blueprintInfo.organisation,
    license: blueprintInfo.license,
    gitHubOwner: blueprintInfo.gitHubOwner,
    npmOrg: blueprintInfo.npmOrg,
    semanticVersioning: blueprintInfo.semanticVersioning,
    ciProfile: blueprintInfo.ciProfile
  })
  await scaffold.commit()
} // initAction

function canCreate (blueprintPath) {
  try {
    fs.statSync(blueprintPath)
    return false
  } catch (e) {
    return true
  }
}

async function solicitDetails (profile) {
  let blueprintInfo = { }

  const questions = [
    {
      type: 'input',
      name: 'description',
      message: 'Description'
    },
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
    },
    {
      type: 'input',
      name: 'license',
      message: 'License',
      initial: 'MIT'
    },
    {
      type: 'input',
      name: 'gitHubOwner',
      message: 'GitHub Owner',
      initial: () => profile.gitHubOwnerSuggestion(blueprintInfo.organisation),
      validate: v => v.match(' ') ? 'No spaces allowed in GitHub Owner name' : true
    },
    {
      type: 'input',
      name: 'npmOrg',
      message: 'NPM Organisation',
      initial: () => profile.npmOrgSuggestion(blueprintInfo.gitHubOwner),
      validate: v => v.match(' ') ? 'No spaces allowed in NPM Organisation name' : true
    },
    {
      type: 'confirm',
      name: 'semanticVersioning',
      message: 'Use Semantic Versioning',
      initial: true
    },
    {
      type: 'select',
      name: 'ciProfile',
      message: 'CI Profile',
      initial: 'travis',
      choices: [
        'travis',
        'None'
      ]
    }
  ]

  for (const question of questions) {
    blueprintInfo = await prompt(question, {}, blueprintInfo)
  }

  return blueprintInfo
}

module.exports = newBlueprint
