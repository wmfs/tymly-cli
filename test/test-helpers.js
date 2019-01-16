const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')
const jsdiff = require('diff')

function prepareFixture (testSuiteName) {
  const { outputPath } = fixturePath(testSuiteName)
  rimraf.sync(outputPath)
  return outputPath
}

function fixturePath (testSuiteName) {
  const basePath = path.join(__dirname, 'fixtures', testSuiteName)
  const expectedPath = path.join(basePath, 'expected')
  const outputPath = path.join(basePath, 'output')

  return {
    expectedPath,
    outputPath
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

module.exports = {
  fixturePath,
  prepareFixture,
  doesNotExist,
  compareOutputs,
  backspace: '\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f'
}
