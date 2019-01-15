/* eslint-env mocha */

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const bddStdin = require('bdd-stdin')
const stdMocks = require('std-mocks')
const path = require('path')
const fs = require('fs-extra')

const helpers = require('./test-helpers')

const newBlueprint = require('../lib/actions').newBlueprintAction

const backspace = '\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f\u007f'

describe('tymly new-blueprint', () => {
  const suiteName = 'new-blueprint'
  const { expectedPath, outputPath } = helpers.fixturePath(suiteName)

  before(() => {
    helpers.prepareFixture(suiteName)
  })

  it('does nothing if no blueprint name provided', async () => {
    const dirName = path.join(outputPath, 'do-nothing')

    await newBlueprint(null, {
      path: dirName
    })

    expect(helpers.doesNotExist(dirName)).to.be.true()
  })

  it('does nothing if target directory already exists', async () => {
    stdMocks.use()
    const expectedNotEmpty = path.join(expectedPath, 'not-empty')
    const dirName = path.join(outputPath, 'not-empty')

    fs.copySync(expectedNotEmpty, dirName)

    await newBlueprint('tymly-pizza-blueprint', {
      path: dirName
    })
    stdMocks.restore()

    helpers.compareOutputs(suiteName, 'not-empty')
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

      await newBlueprint(blueprintName, {
        path: path.join(outputPath, dirName)
      })

      stdMocks.restore()
      helpers.compareOutputs(suiteName, dirName)
    })
  }
})
