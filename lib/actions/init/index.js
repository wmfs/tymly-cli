const c = require('ansi-colors')
const { prompt } = require('enquirer')
const Scaffold = require('@wmfs/tymly-scaffold')

async function initAction (blueprintName, options) {
  if (!blueprintName) {
    return
  }

  const workingDirectory = options.path || '.'
  console.log(c.bold(`Creating blueprint ${c.cyan(blueprintName)} in ${workingDirectory}`))

  const blueprintInfo = await solicitDetails()

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

async function solicitDetails () {
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
    },
    {
      type: 'input',
      name: 'gitHubOwner',
      message: 'GitHub Owner',
      initial: () => blueprintInfo.organisation.match(' ')
        ? blueprintInfo.organisation.split(' ').map(s => `${s.toLowerCase()[0]}`).join('')
        : blueprintInfo.organisation.toLowerCase()
    },
    {
      type: 'input',
      name: 'npmOrg',
      message: 'NPM Organisation',
      initial: () => blueprintInfo.gitHubOwner
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

module.exports = initAction
