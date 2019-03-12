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
  } // constructor

  get name () { return this.blueprint.name }
  get namespace () { return this.blueprint.namespace }

  models () {
    return this.readComponents_(
      'models',
      (name, schema) => {
        return {
          name: name,
          fields: Object.keys(schema.properties),
          schema: schema
        }
      }
    )
  } // models

  forms () {
    return this.readComponents_(
      'card-templates',
      (name, details) => {
        return {
          name: name,
          description: (details.templateMeta && details.templateMeta.title) || name,
          meta: details.meta
        }
      }
    )
  } // forms

  stateMachines () {
    return this.readComponents_(
      'state-machines',
      (name, details) => {
        const parts = [
          this.namespace,
          _.camelCase(name),
          details.version
        ]
        const machineName = parts
          .filter(p => p)
          .map(p => p.replace('.', '_'))
          .join('_')

        return {
          name: details.name || machineName,
          description: details.Comment,
          machine: machineName
        }
      }
    )
  } // stateMachines

  categories () {
    return this.readComponents_(
      'categories',
      (name, details) => {
        return {
          name: name,
          ...details
        }
      })
  } // categories

  roles (includeBuiltin = false) {
    const roles = this.readComponents_(
      'template-roles',
      (name, details) => {
        return {
          name: `${this.namespace}_${name}`,
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
  } /// dataDomains

  get scaffold () { return this.scaffold_ }

  readComponents_ (directory, transformer) {
    const names = listJsonFiles(this.path, directory)
    const cats = names.map(n => {
      const details = readJson(this.path, directory, `${n}.json`)
      return transformer(_.camelCase(n), details)
    })
    return grabExtras(cats, this.uses, directory)
  } // readComponentFiles
} // class Blueprint

const directoryToFn = {
  'models': 'models',
  'card-templates': 'forms',
  'state-machines': 'stateMachines',
  'categories': 'categories',
  'template-roles': 'roles',
  'functions': 'functions'
}

function grabExtras (target, uses, directory) {
  const fn = directoryToFn[directory]
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
