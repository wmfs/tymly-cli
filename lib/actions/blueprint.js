const fs = require('fs-extra')
const path = require('path')
const c = require('ansi-colors')
const Scaffold = require('@wmfs/tymly-scaffold')

class Blueprint {
  static load (options) {
    const blueprintDir = options.path || '.'
    const blueprintJsonPath = path.join(blueprintDir, 'blueprint.json')

    if (!fs.pathExistsSync(blueprintDir) || !fs.pathExistsSync(blueprintJsonPath)) {
      console.log(c.bold.red(`Can not find ${c.cyan('blueprint.json')} in ${c.cyan(blueprintDir)}`))
      return null
    }

    return new Blueprint(blueprintDir, blueprintJsonPath)
  } // load

  constructor (blueprintDir, blueprintJsonPath) {
    this.blueprint = fs.readJsonSync(blueprintJsonPath)
    this.path = blueprintDir

    this.scaffold_ = new Scaffold()
    this.scaffold_.setBlueprintDir(this.path)
  }

  models () {
    const names = fs.readdirSync(path.join(this.path, 'models'))
      .filter(f => f.endsWith('.json'))
      .filter(f => this.isFile('models', f))
      .map(f => f.replace('.json', ''))
    names.sort()
    return names.map(n => {
      return {
        name: n,
        fields: this.modelPropertyNames(n)
      }
    })
  }

  modelPropertyNames (modelName) {
    return Object.keys(this.scaffold.loadModel(modelName).properties)
  }

  isFile (...pathElements) {
    const fullName = path.join(this.path, ...pathElements)
    return fs.statSync(fullName).isFile()
  }

  get name () { return this.blueprint.name }
  get scaffold () { return this.scaffold_ }
}

module.exports = Blueprint
