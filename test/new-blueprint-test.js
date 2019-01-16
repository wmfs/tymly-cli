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
      helpers.backspace + 'wmfs',
      'w m f s',
      helpers.backspace + 'wmfs',
      'Y',
      'travis'
    ],
    'use profile details': [
      'tymly-pizza-blueprint',
      'For ordering delicious pizza',
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    ],
    'do nothing if not empty': [
      'tymly-pizza-blueprint'
    ]
  }

  for (const [name, inputs] of Object.entries(tests)) {
    const blueprintName = inputs.shift()

    helpers.runTest(
      suiteName,
      name,
      inputs,
      newBlueprint,
      blueprintName,
      {
        path: name
      }
    )
  }
})
