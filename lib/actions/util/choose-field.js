const ask = require('./ask')

async function chooseField (blueprint, modelName) {
  const model = blueprint.models().find(m => m.name === modelName)

  const noField = 'No field'
  const fields = [{
    name: noField
  }]
  for (const [name, props] of Object.entries(model.schema.properties)) {
    fields.push({
      name: name,
      message: props.title || name,
      hint: props.description,
      value: name
    })
  }

  const field = await ask({
    type: 'autocomplete',
    message: 'Select a field',
    choices: fields
  })

  return (field !== noField)
    ? field
    : null
}

module.exports = chooseField
