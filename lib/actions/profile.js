const fs = require('fs-extra')
const path = require('path')
const homedir = require('os').homedir()
const username = require('username')

const Properties = [
  'author',
  'organisation',
  'gitHubOwner',
  'npmOrg'
]

class Profile {
  constructor (profileFileName, initial = null) {
    this.directory = path.dirname(profileFileName)
    this.profileFileName = profileFileName
    this.loaded = !!initial
    this.update(initial || { })
  }

  authorSuggestion () { return this.author || username.sync() }
  organisationSuggestion () { return this.organisation || '' }
  gitHubOwnerSuggestion (org) { return this.gitHubOwner || gitHubGuess(org) }
  npmOrgSuggestion (org) { return this.npmOrg || org }

  update (props) {
    Properties.forEach(p => { this[p] = props[p] })
  }

  save () {
    const o = { }
    Properties.forEach(p => { o[p] = this[p] })
    fs.mkdirsSync(path.dirname(this.profileFileName))
    fs.writeFileSync(
      this.profileFileName,
      JSON.stringify(o, null, 2) + '\n'
    )
  }
}

function load (profileFileName) {
  try {
    const o = JSON.parse(
      fs.readFileSync(profileFileName)
    )
    return o
  } catch (e) { }
}

function loadProfile (profileDir) {
  const workingDir = profileDir || path.join(homedir, '.tymly')

  const profileFileName = path.join(workingDir, 'tymly-profile.json')

  return new Profile(
    profileFileName,
    load(profileFileName)
  )
}

function gitHubGuess (org) {
  return org.match(' ')
    ? org.split(' ').map(s => `${s.toLowerCase()[0]}`).join('')
    : org.toLowerCase()
}

module.exports = loadProfile
