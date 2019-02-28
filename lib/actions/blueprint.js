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

  get name () { return this.blueprint.name }
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

    return grabExtras(models, this.uses, 'models')
  } // models

  forms () {
    const names = listJsonFiles(this.path, 'card-templates')
    const forms = names.map(n => {
      return {
        name: n,
        meta: formMeta(this.path, 'card-templates', `${n}.json`)
      }
    })

    return grabExtras(forms, this.uses, 'forms')
  } // forms

  stateMachines () {
    const names = listJsonFiles(this.path, 'state-machines')
    const machines = names.map(name => {
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

    return grabExtras(machines, this.uses, 'stateMachines')
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
    return grabExtras(cats, this.uses, 'categories')
  }

  roles (includeBuiltin = false) {
    const names = listJsonFiles(this.path, 'template-roles')
    const roles = names.map(n => {
      const details = readJson(this.path, 'template-roles', `${n}.json`)
      return {
        name: `${this.namespace}_${n}`,
        ...details
      }
    })
    grabExtras(roles, this.uses, 'roles')
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
  } // roles

  functions () {
    const fns = listJsFiles(this.path, 'functions')
      .map(n => {
        return {
          name: `${this.namespace}_${_.camelCase(n)}`
        }
      })
    return grabExtras(fns, this.uses, 'functions')
  } // functions

  dataDomains () {
    return (this.blueprint.meta && this.blueprint.meta.domains) || null
  }

  modelProperties (modelName) {
    return this.scaffold.loadModel(modelName)
  }

  modelPropertyNames (modelName) {
    return Object.keys(this.scaffold.loadModel(modelName).properties)
  }

  get scaffold () { return this.scaffold_ }
}

function grabExtras (target, uses, fn) {
  uses.forEach(b => {
    const extras = b[fn]()
    extras.forEach(e => { if (!e.parent) e.parent = b.name })
    target.push(...extras)
  })
  return target
} // grabExtras

function listJsFiles (basepath, directory) {
  return listFiles(basepath, directory, '.js')
} // listJsFiles

function listJsonFiles (basepath, directory) {
  return listFiles(basepath, directory, '.json')
} // listJsonFiles

function listFiles (basepath, directory, suffix) {
  if (!isDir(basepath, directory)) return []

  const names = fs.readdirSync(path.join(basepath, directory))
    .filter(f => f.endsWith(suffix))
    .filter(f => isFile(basepath, directory, f))
    .map(f => f.replace(suffix, ''))
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
