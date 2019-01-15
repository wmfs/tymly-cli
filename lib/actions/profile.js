const fs = require('fs-extra')
const path = require('path')

const Properties = [
  'author',
  'organisation',
  'gitHubOwner',
  'npmOrg'
]

class Profile {
  constructor (profileFileName, initial = null) {
    this.profileFileName = profileFileName
    this.loaded = !!initial
    this.update(initial || { })
  }

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
  const profileFileName = path.join(profileDir, 'tymly-profile.json')

  return new Profile(
    profileFileName,
    load(profileFileName)
  )
}

module.exports = loadProfile
