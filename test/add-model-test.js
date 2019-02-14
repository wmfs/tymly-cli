/* eslint-env mocha */

const helpers = require('./test-helpers')

const addModel = require('../lib/actions').addModelAction

describe('tymly add-model', () => {
  /*
  test-name: {
    model name,
    model title,
    model description,
    field name,
    field title,
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
      '',
      '',
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
      '',
      '',
      'string',
      'Y',
      'Y',
      'label',
      'Customer-facing label',
      '',
      '',
      '',
      'Y',
      'popularitySeq',
      '',
      'num',
      '',
      '',
      '',
      'vegetarian',
      '',
      helpers.down + helpers.down + helpers.down,
      'bool',
      '',
      '',
      ''
    ],
    'no-blanks-in-field-names': [
      'pizza',
      'Pizza',
      'A pizza',
      'a loveley name',
      helpers.backspace + 'name',
      '',
      '',
      'string',
      'Y',
      'Y',
      ''
    ]

  }

  const suiteName = 'add-model'

  before(() => {
    helpers.prepareFixture(suiteName)
  })

  for (const [name, inputs] of Object.entries(tests)) {
    helpers.runTest(
      suiteName,
      name,
      inputs,
      addModel,
      { }
    )
  }
})
