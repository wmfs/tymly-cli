const c = require('ansi-colors')
const { prompt } = require('enquirer')
const loadProfile = require('../profile')

async function initAction (options) {
  const profile = loadProfile(options.profile)
  console.log(c.bold(`${profile.loaded ? 'Updating' : 'Creating'} Tymly profile in ${profile.directory}`))

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
      initial: () => profile.authorSuggestion()
    },
    {
      type: 'input',
      name: 'organisation',
      message: 'Your Organisation',
      initial: () => profile.organisationSuggestion()
    },
    {
      type: 'input',
      name: 'gitHubOwner',
      message: 'GitHub Owner',
      initial: () => profile.gitHubOwnerSuggestion(profileInfo.organisation),
      validate: v => v.match(' ') ? 'No spaces allowed in GitHub Owner name' : true
    },
    {
      type: 'input',
      name: 'npmOrg',
      message: 'NPM Organisation',
      initial: () => profile.npmOrgSuggestion(profileInfo.gitHubOwner),
      validate: v => v.match(' ') ? 'No spaces allowed in NPM Organisation name' : true
    }
  ]

  for (const question of questions) {
    profileInfo = await prompt(question, { }, profileInfo)
  }

  return profileInfo
} // gatherProfileDetails

module.exports = initAction
