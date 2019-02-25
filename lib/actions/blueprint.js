const fs = require('fs-extra')
const path = require('path')
const c = require('ansi-colors')
const _ = require('lodash')
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

    this.uses = resolveUses(blueprintDir, this.blueprint.meta)
  }

  get name() { return this.blueprint.name }
  get namespace () { return this.blueprint.namespace }

  models () {
    const names = listJsonFiles(this.path, 'models')
    const models = names.map(n => {
      const schema = this.modelProperties(n)
      return {
        name: n,
        fields: Object.keys(schema.properties),
        schema: schema
      }
    })

    this.uses.forEach(b => {
      const extras = b.models()
      extras.forEach(e => { if(!e.parent) e.parent = b.name })
      models.push(...extras)
    })

    return models
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

  stateMachines () {
    const names = listJsonFiles(this.path, 'state-machines')
    return names.map(name => {
      const details = readJson(this.path, 'state-machines', `${name}.json`)

      const parts = [
        this.namespace,
        _.camelCase(name),
        details.version
      ]

      return parts
        .filter(p => p)
        .map(p => p.replace('.', '_'))
        .join('_')
    })
  } // stateMachines

  categories () {
    const names = listJsonFiles(this.path, 'categories')
    const cats = names.map(n => {
      const details = readJson(this.path, 'categories', `${n}.json`)
      return {
        name: n,
        ...details
      }
    })
    return cats
  }

  roles (includeBuiltin = true) {
    const names = listJsonFiles(this.path, 'template-roles')
    const roles = names.map(n => {
      const details = readJson(this.path, 'template-roles', `${n}.json`)
      return {
        name: `${this.namespace}_${n}`,
        ...details
      }
    })
    if (includeBuiltin) {
      roles.unshift({
        name: '$everyone',
        label: 'Everyone'
      }, {
        name: '$authenticated',
        label: 'Logged in users'
      })
    } // if ...
    return roles
  }

  dataDomains () {
    return (this.blueprint.meta && this.blueprint.meta.domains) || null
  }

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

function readJson (...pathElements) {
  const fullName = path.join(...pathElements)
  return fs.readJsonSync(fullName)
} // readJson

function formMeta (...pathElements) {
  const formJson = readJson(...pathElements)

  return formJson.meta ? formJson.meta : null
} // formMeta

function resolveUses (blueprintDir, meta) {
  if (!meta || !meta.uses) return []

  const blueprintPaths = meta.uses.map(p => path.resolve(blueprintDir, p))
  const blueprints = blueprintPaths.map(p => Blueprint.load({ path: p }))

  const filtered = blueprints.filter(b => b)
  if (filtered.length !== blueprints.length) {
    console.log(c.bold.yellow(`Can not load all used blueprints. Proceed with caution`))
  }

  return filtered
}

module.exports = Blueprint
