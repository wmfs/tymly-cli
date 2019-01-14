/* eslint-env mocha */

const chai = require('chai')
chai.use(require('chai-fs'))
chai.use(require('dirty-chai'))
const expect = chai.expect
const bddStdin = require('bdd-stdin')
const stdMocks = require('std-mocks')
const rimraf = require('rimraf')
const path = require('path')
const fs = require('fs-extra')
const jsdiff = require('diff')

const initAction = require('../lib/actions/init')

const backspace = '\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f'

describe('tymly init command', () => {
  const basePath = path.join(__dirname, 'fixtures')
  const expectedPath = path.join(basePath, 'expected')
  const outputPath = path.join(basePath, 'output')

  before(() => {
    rimraf.sync(outputPath)
  })

  it('does nothing if no blueprint name provided', async () => {
    const dirName = path.join(outputPath, 'do-nothing')

    await initAction(null, {
      path: dirName
    })

    expect(doesNotExist(dirName)).to.be.true()
  })

  it('does nothing if target directory already exists', async () => {
    const expectedNotEmpty = path.join(expectedPath, 'not-empty')
    const dirName = path.join(outputPath, 'not-empty')

    fs.copySync(expectedNotEmpty, dirName)

    await initAction('tymly-pizza-blueprint', {
      path: dirName
    })

    compareDirectories(expectedNotEmpty, dirName)
  })

  const tests = {
    'fill out all answers': [
      'tymly-pizza-blueprint',
      'For ordering delicious pizza',
      'Jane Doe',
      'West Midlands Fire Service',
      'MIT',
      'wmfs',
      'wmfs',
      'Y',
      'travis'
    ],
    'default org name from organisation initials': [
      'tymly-pizza-blueprint',
      'For ordering delicious pizza',
      'Jane Doe',
      'West Midlands Fire Service',
      'MIT',
      '',
      '',
      'Y',
      'travis'
    ],
    'default org name from organisation if single word': [
      'tymly-pizza-blueprint',
      'For ordering delicious pizza',
      'Jane Doe',
      'WestMidlandsFireService',
      'MIT',
      '',
      'wmfs',
      'Y',
      'travis'
    ],
    'default npm org to wmfs org': [
      'tymly-pizza-blueprint',
      'For ordering delicious pizza',
      'Jane Doe',
      'The Trousers',
      'MIT',
      'wmfs',
      '',
      'Y',
      'travis'
    ],
    'no blanks allowed in github or npm org': [
      'tymly-pizza-blueprint',
      'For ordering delicious pizza',
      'Jane Doe',
      'West Midlands Fire Service',
      'MIT',
      'w m f s',
      backspace + 'wmfs',
      'w m f s',
      backspace + 'wmfs',
      'Y',
      'travis'
    ]
  }

  for (const [name, params] of Object.entries(tests)) {
    it(name, async () => {
      stdMocks.use()

      const blueprintName = params.shift()
      const dirName = name.replace(/ /g, '-')

      bddStdin(
        ...params.map(p => `${p}\n`)
      )

      await initAction(blueprintName, {
        path: path.join(outputPath, dirName)
      })

      stdMocks.restore()
      compareOutputs(dirName)
    })
  }

  function compareOutputs (testDir) {
    const expectedDir = path.join(expectedPath, testDir)
    const outputDir = path.join(outputPath, testDir)

    const errors = compareDirectories(expectedDir, outputDir, [])
    errors.forEach(e => {
      const pattern = new RegExp(`(\\s[^\\s]*)${testDir}`)
      const m = e.replace(pattern, ` ${testDir}`)
      console.log(m)
    })
    expect(errors.length).to.eql(0)
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

    const expected = fs.readFileSync(expectedFile, 'utf8')
    const output = fs.readFileSync(outputFile, 'utf8')

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
})
