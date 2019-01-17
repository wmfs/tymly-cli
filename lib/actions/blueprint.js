const fs = require('fs-extra')
const path = require('path')

class Blueprint {
  static load (blueprintDir) {
    const blueprintJsonPath = path.join(blueprintDir, 'blueprint.json')
    if (!fs.pathExists(blueprintDir) || !fs.pathExists(blueprintJsonPath)) {
      return null
    }

    return new Blueprint(blueprintDir, blueprintJsonPath)
  } // load

  constructor (blueprintDir, blueprintJsonPath) {
    this.blueprint = fs.readJsonSync(blueprintJsonPath)
    this.path = blueprintDir
  }

  models () {
    return fs.readdirSync(path.join(this.path, 'models'))
      .filter(f => f.endsWith('.json'))
      .filter(f => this.isFile('models', f))
      .map(f => f.replace('.json', ''))
  }

  isFile (...pathElements) {
    const fullName = path.join(this.path, ...pathElements)
    return fs.statSync(fullName).isFile()
  }
}

module.exports = Blueprint
