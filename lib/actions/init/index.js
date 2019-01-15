const c = require('ansi-colors')
const path = require('path')
const homedir = require('os').homedir()
const fs = require('fs-extra')
const { prompt } = require('enquirer')

async function initAction (options) {
  const workingDirectory = options.profile || path.join(homedir, '.tymly')

  console.log(c.bold(`Creating Tymly profile in ${workingDirectory}`))

  const profileDetails = await gatherProfileDetails()

  fs.mkdirsSync(workingDirectory)
  fs.writeFileSync(
    path.join(workingDirectory, 'tymly-profile.json'),
    JSON.stringify(profileDetails, null, 2) + '\n'
  )
}

async function gatherProfileDetails () {
  let profileInfo = { }

  const questions = [
    {
      type: 'input',
      name: 'author',
      message: 'Your name',
      initial: process.env.user
    },
    {
      type: 'input',
      name: 'organisation',
      message: 'Your Organisation'
    },
    {
      type: 'input',
      name: 'gitHubOwner',
      message: 'GitHub Owner',
      initial: () => profileInfo.organisation.match(' ')
        ? profileInfo.organisation.split(' ').map(s => `${s.toLowerCase()[0]}`).join('')
        : profileInfo.organisation.toLowerCase(),
      validate: v => v.match(' ') ? 'No spaces allowed in GitHub Owner name' : true
    },
    {
      type: 'input',
      name: 'npmOrg',
      message: 'NPM Organisation',
      initial: () => profileInfo.gitHubOwner,
      validate: v => v.match(' ') ? 'No spaces allowed in NPM Organisation name' : true
    }
  ]

  for (const question of questions) {
    profileInfo = await prompt(question, {}, profileInfo)
  }

  return profileInfo
} // gatherProfileDetails

module.exports = initAction
