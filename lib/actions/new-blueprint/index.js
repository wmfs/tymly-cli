const c = require('ansi-colors')
const { prompt } = require('enquirer')
const path = require('path')
const fs = require('fs')
const loadProfile = require('../profile')
const Scaffold = require('@wmfs/tymly-scaffold')
const validate = require('../util/validators')

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
  const blueprintInfo = await solicitDetails(blueprintName, profile)

  const scaffold = new Scaffold({
    basePath: workingDirectory
  })
  scaffold.addBlueprint(blueprintInfo)
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

async function solicitDetails (blueprintName, profile) {
  let blueprintInfo = {
    name: blueprintName
  }

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
      validate: validate.noSpaces('No spaces allowed in GitHub Owner name')
    },
    {
      type: 'input',
      name: 'npmOrg',
      message: 'NPM Organisation',
      initial: () => profile.npmOrgSuggestion(blueprintInfo.gitHubOwner),
      validate: validate.noSpaces('No spaces allowed in NPM Organisation name')
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
