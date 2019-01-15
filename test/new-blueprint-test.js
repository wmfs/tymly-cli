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

    const cwd = process.cwd()
    process.chdir(dirName)

    await newBlueprint('tymly-pizza-blueprint', {})

    process.chdir(cwd)
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
    ],
    '!use profile details': [
      'tymly-pizza-blueprint',
      'For ordering delicious pizza',
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    ]
  }

  for (const [testname, params] of Object.entries(tests)) {
    const profile = testname[0] === '!'
    const name = testname.replace('!', '')
    it(name, async () => {
      stdMocks.use()

      const blueprintName = params.shift()
      const dirName = name.replace(/ /g, '-')

      bddStdin(
        ...params.map(p => `${p}\n`)
      )

      const options = {
        path: path.join(outputPath, dirName)
      }
      if (profile) {
        options.profile = path.join(path.dirname(outputPath), 'profile')
      }

      await newBlueprint(blueprintName, options)

      stdMocks.restore()
      helpers.compareOutputs(suiteName, dirName)
    })
  }
})
