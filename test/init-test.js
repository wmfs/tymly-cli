/* eslint-env mocha */

const chai = require('chai')
chai.use(require('chai-fs'))
chai.use(require('dirty-chai'))
const expect = chai.expect
const bddStdin = require('bdd-stdin')
const rimraf = require('rimraf')
const path = require('path')
const fs = require('fs')
const jsdiff = require('diff')

const initAction = require('../lib/actions/init')

describe('tymly init command', () => {
  const basePath = path.join(__dirname, 'fixtures')
  const expectedPath = path.join(basePath, 'expected')
  const outputPath = path.join(basePath, 'output')

  before(() => {
    rimraf.sync(outputPath)
  })

  it('fill out all answers to create blueprint skeleton', async () => {
    bddStdin(
      'For ordering delicious pizza\n',
      'Jane Doe\n',
      'West Midlands Fire Service\n',
      'MIT\n',
      'wmfs\n',
      'wmfs\n',
      '\n',
      '\n'
    )

    const blueprintDir = path.join(outputPath, 'test-a')

    await initAction('tymly-pizza-blueprint', {
      path: blueprintDir
    })

    compareOutputs('test-a')
  })

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
      return
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
