/* eslint-env mocha */

const chai = require('chai')
chai.use(require('dirty-chai'))
const fail = chai.expect.fail

const bddStdin = require('bdd-stdin')
const stdMocks = require('std-mocks')

const path = require('path')
const fs = require('fs-extra')
const rimraf = require('rimraf')
const jsdiff = require('diff')

const homedir = require('os').homedir()
const userProfilePath = path.join(homedir, '.tymly', 'tymly-profile.json')
const dinkedUserProfilePath = `${userProfilePath}.dink`

process.on('unhandledRejection', error => {
  console.error('unhandledRejection', error.message)
  console.error(error.stack.toString())
})

function prepareFixture (testSuiteName) {
  const { initialPath, outputPath } = fixturePath(testSuiteName)

  rimraf.sync(outputPath)

  if (initialPath) {
    for (const item of fs.readdirSync(initialPath)) {
      fs.copySync(
        path.join(initialPath, item),
        path.join(outputPath, item)
      )
    }
  }

  return outputPath
}

function runTest (suiteName, testName, inputs, actionFn, ...args) {
  it(testName, async () => {
    dinkUserProfile()
    stdMocks.use({ stderr: false })

    const { outputPath, profilePath = 'nowhere' } = fixturePath(suiteName)
    const dirName = testName.replace(/ /g, '-')

    if (inputs.length) {
      bddStdin(inputs.map(p => `${p}\n`))
    }

    const options = args[args.length - 1]
    for (const p of ['path', 'profile']) {
      if (options && options[p] === testName) {
        options[p] = path.join(outputPath, dirName)
      }
    }
    for (const p of ['use']) {
      if (options && options[p]) {
        options[p] = path.resolve(outputPath, options[p])
      }
    }

    const testProfile = path.join(profilePath, dirName)
    if (fs.pathExistsSync(testProfile)) {
      options.profile = testProfile
    }

    const cwd = process.cwd()
    const twd = path.join(outputPath, dirName)
    fs.mkdirsSync(twd)
    process.chdir(twd)

    let ohDear = null
    try {
      await actionFn(...args)
    } catch (e) {
      ohDear = e
    }

    process.chdir(cwd)
    stdMocks.restore()
    undinkUserProfile()

    if (ohDear) {
      throw ohDear
    }
    compareOutputs(suiteName, dirName)
  })
}

function fixturePath (testSuiteName) {
  const basePath = path.join(__dirname, 'fixtures', testSuiteName)
  const initialPath = path.join(basePath, 'initial')
  const expectedPath = path.join(basePath, 'expected')
  const outputPath = path.join(basePath, 'output')
  const profilePath = path.join(basePath, 'profile')

  return {
    expectedPath,
    outputPath,
    profilePath,
    initialPath: fs.pathExistsSync(initialPath) ? initialPath : null
  }
}

function compareOutputs (testSuiteName, testDir) {
  const { expectedPath, outputPath } = fixturePath(testSuiteName)
  const expectedDir = path.join(expectedPath, testDir)
  const outputDir = path.join(outputPath, testDir)

  const errors = compareDirectories(expectedDir, outputDir, [])
  errors.forEach(e => {
    const pattern = new RegExp(`(\\s[^\\s]*)${testDir}`)
    const m = e.replace(pattern, ` ${testDir}`)
    console.log(m)
  })

  if (errors.length) {
    fail()
  }
}

function compareDirectories (expectedDir, outputDir, errors) {
  if (doesNotExist(outputDir)) {
    errors.push(`Missing directory ${outputDir}`)
    return errors
  }

  for (const file of fs.readdirSync(expectedDir)) {
    const expected = path.join(expectedDir, file)
    const output = path.join(outputDir, file)

    if (fs.statSync(expected).isDirectory()) {
      compareDirectories(expected, output, errors)
    } else {
      compareFiles(expected, output, errors)
    }
  } // for ...

  return errors
} // compareDirectories

function compareFiles (expectedFile, outputFile, errors) {
  if (doesNotExist(outputFile)) {
    errors.push(`Missing file ${outputFile}`)
    return
  }

  const expected = loadFile(expectedFile)
  const output = loadFile(outputFile)

  const diff = jsdiff.diffLines(expected, output)
  if (diff.length === 1) return

  let error = `Error in file ${outputFile}`
  for (const d of diff) {
    if (d.added) {
      error += fileError('+', d.value)
    }
    if (d.removed) {
      error += fileError('-', d.value)
    }
  }

  errors.push(error)
} // compareFiles

function loadFile (fileName) {
  const year = new Date().getFullYear()
  const file = fs.readFileSync(fileName, 'utf8')
  const lines = file
    .split('\n')
    .map(l => l.replace('{year}', year))
    .filter(l => !l.match(/"generated(With|On)":/))
    .filter(l => !!l.trim())
    .join('\n')
  return lines
}

function fileError (flag, value) {
  if (value === '\n') {
    return `\n  ${flag}`
  }

  return value
    .split('\n')
    .map(v => v ? `\n  ${flag} ${v}` : '')
    .join('')
}

function doesNotExist (fileOrDir) {
  try {
    fs.statSync(fileOrDir)
    return false
  } catch (e) {
    return true
  }
}

function dinkUserProfile () {
  moveIfExists(userProfilePath, dinkedUserProfilePath)
}

function undinkUserProfile () {
  moveIfExists(dinkedUserProfilePath, userProfilePath)
}

function moveIfExists (from, to) {
  if (fs.pathExistsSync(from)) {
    fs.moveSync(from, to)
  }
}

module.exports = {
  fixturePath,
  prepareFixture,
  doesNotExist,
  compareOutputs,
  runTest,
  backspace: '\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f',
  up: bddStdin.keys.up,
  down: bddStdin.keys.down,
  left: bddStdin.keys.left,
  right: bddStdin.keys.right
}
