/* eslint-env mocha */

const helpers = require('./test-helpers')

const addModelTest = require('../lib/actions').addModelAction

describe('tymly add-model', () => {
  /*
  test-name: {
    model name,
    model title,
    model description,
    field name,
    field type,
    is primary key,
    is required,
    ...
   */

  const tests = {
    'named-pizza': [
      'pizza',
      'Pizza',
      'A pizza',
      'name',
      'string',
      'Y',
      'Y',
      ''
    ],
    'multiple-fields': [
      'pizza',
      'Pizza',
      'A pizza',
      'code',
      'string',
      'Y',
      'Y',
      'label',
      '',
      '',
      'Y',
      'popularitySeq',
      helpers.down,
      '',
      '',
      'vegetarian',
      helpers.down+helpers.down,
      '',
      '',
      ''
    ]
  }

  const suiteName = 'add-model'

  before(() => {
    helpers.prepareFixture(suiteName)
  })

  for (const [name, inputs] of Object.entries(tests)) {
    const pizzaName = inputs.shift()
    helpers.runTest(
      suiteName,
      name,
      inputs,
      addModelTest,
      pizzaName,
      { }
    )
  }
})
