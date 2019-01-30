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

  get namespace () { return this.blueprint.namespace }

  models () {
    const names = listJsonFiles(this.path, 'models')
    return names.map(n => {
      const schema = this.modelProperties(n)
      return {
        name: n,
        fields: Object.keys(schema.properties),
        schema: schema
      }
    })
  }

  forms () {
    const names = listJsonFiles(this.path, 'card-templates')
    return names.map(n => {
      return {
        name: n,
        meta: formMeta(this.path, 'card-templates', `${n}.json`)
      }
    })
  } // forms

  modelProperties (modelName) {
    return this.scaffold.loadModel(modelName)
  }

  modelPropertyNames (modelName) {
    return Object.keys(this.scaffold.loadModel(modelName).properties)
  }

  get name () { return this.blueprint.name }
  get scaffold () { return this.scaffold_ }
}

function listJsonFiles (basepath, directory) {
  if (!isDir(basepath, directory)) return []

  const names = fs.readdirSync(path.join(basepath, directory))
    .filter(f => f.endsWith('.json'))
    .filter(f => isFile(basepath, directory, f))
    .map(f => f.replace('.json', ''))
  names.sort()
  return names
} // listJsonFiles

function isFile (...pathElements) {
  const fullName = path.join(...pathElements)
  return fs.statSync(fullName).isFile()
} // isFile
function isDir (...pathElements) {
  const fullName = path.join(...pathElements)
  return fs.pathExistsSync(fullName) && fs.statSync(fullName).isDirectory()
} // isFile

function formMeta (...pathElements) {
  const fullName = path.join(...pathElements)
  const formJson = fs.readJsonSync(fullName)

  return formJson.meta ? formJson.meta : null
}

module.exports = Blueprint
