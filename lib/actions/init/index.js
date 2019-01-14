const c = require('ansi-colors')
const { prompt } = require('enquirer')
const Scaffold = require('@wmfs/tymly-scaffold')

async function initAction (blueprintName, options) {
  if (!blueprintName) {
    return
  }

  const workingDirectory = options.path || '.'
  console.log(c.bold(`Creating blueprint ${c.cyan(blueprintName)} in ${workingDirectory}`))

  const blueprintInfoPrompts = [
    {
      type: 'input',
      name: 'description',
      message: 'Description'
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author',
      initial: process.env.user
    },
    {
      type: 'input',
      name: 'organisation',
      message: 'Organisation'
    },
    {
      type: 'input',
      name: 'license',
      message: 'License',
      initial: 'MIT'
    }
  ]

  const blueprintInfo = await prompt(blueprintInfoPrompts)

  const technicalInfoPrompts = [
    {
      type: 'input',
      name: 'gitHubOwner',
      message: 'GitHub Owner',
      initial: blueprintInfo.organisation
    },
    {
      type: 'input',
      name: 'npmOrg',
      message: 'NPM Organisation',
      initial: blueprintInfo.organisation
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

  const technicalInfo = await prompt(technicalInfoPrompts)

  const scaffold = new Scaffold({
    basePath: workingDirectory
  })
  scaffold.addBlueprint({
    name: blueprintName,
    description: blueprintInfo.description,
    author: blueprintInfo.author,
    organisation: blueprintInfo.organisation,
    license: blueprintInfo.license,
    gitHubOwner: technicalInfo.gitHubOwner,
    npmOrg: technicalInfo.npmOrg,
    semanticVersioning: technicalInfo.semanticVersioning,
    ciProfile: technicalInfo.ciProfile
  })
  await scaffold.commit()
}

module.exports = initAction
