const c = require('ansi-colors')
const path = require('path')
const homedir = require('os').homedir()
const { prompt } = require('enquirer')
const loadProfile = require('../profile')
const username = require('username')

async function initAction (options) {
  const workingDirectory = options.profile || path.join(homedir, '.tymly')

  const profile = loadProfile(workingDirectory)
  console.log(c.bold(`${profile.loaded ? 'Updating' : 'Creating'} Tymly profile in ${workingDirectory}`))

  const updates = await gatherProfileDetails(profile)

  profile.update(updates)
  profile.save()
}

async function gatherProfileDetails (profile) {
  let profileInfo = { }

  const questions = [
    {
      type: 'input',
      name: 'author',
      message: 'Your name',
      initial: profile.author || await username()
    },
    {
      type: 'input',
      name: 'organisation',
      message: 'Your Organisation',
      initial: profile.organisation || ''
    },
    {
      type: 'input',
      name: 'gitHubOwner',
      message: 'GitHub Owner',
      initial: () => profile.gitHubOwner || gitHubGuess(profileInfo.organisation),
      validate: v => v.match(' ') ? 'No spaces allowed in GitHub Owner name' : true
    },
    {
      type: 'input',
      name: 'npmOrg',
      message: 'NPM Organisation',
      initial: () => profile.npmOrg || profileInfo.gitHubOwner,
      validate: v => v.match(' ') ? 'No spaces allowed in NPM Organisation name' : true
    }
  ]

  for (const question of questions) {
    profileInfo = await prompt(question, { }, profileInfo)
  }

  return profileInfo
} // gatherProfileDetails

function gitHubGuess (org) {
  return org.match(' ')
    ? org.split(' ').map(s => `${s.toLowerCase()[0]}`).join('')
    : org.toLowerCase()
}

module.exports = initAction
