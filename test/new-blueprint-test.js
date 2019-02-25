/* eslint-env mocha */

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const path = require('path')

const helpers = require('./test-helpers')

const newBlueprint = require('../lib/actions').newBlueprintAction

describe('tymly new-blueprint', () => {
  const suiteName = 'new-blueprint'
  let outputPath

  before(() => {
    outputPath = helpers.prepareFixture(suiteName)
  })

  it('does nothing if no blueprint name provided', async () => {
    const dirName = path.join(outputPath, 'do-nothing')

    await newBlueprint('   ', { })
    await newBlueprint('', { })
    await newBlueprint(null, { })

    expect(helpers.doesNotExist(dirName)).to.be.true()
  })

  const tests = {
    'fill out all answers': [
      'tymly-pizza-blueprint',
      'wmfs',
      'For ordering delicious pizza',
      helpers.down + helpers.down + helpers.down + ' ',
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
      'wmfs',
      'For ordering delicious pizza',
      '',
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
      'wmfs',
      'For ordering delicious pizza',
      '',
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
      'wmfs',
      'For ordering delicious pizza',
      '',
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
      'wmfs',
      'For ordering delicious pizza',
      '',
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
      'wmfs',
      'For ordering delicious pizza',
      '',
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

  const useAnotherInputs = [
    'wmfs',
    'For ordering delicious pizza',
    '',
    'Jane Doe',
    'West Midlands Fire Service',
    'MIT',
    '',
    '',
    'Y',
    'travis'
  ]

  helpers.runTest(
    suiteName,
    'use another',
    useAnotherInputs,
    newBlueprint,
    'tymly-pizza-blueprint',
    {
      use: '../../additional-blueprint'
    }
  )

})
