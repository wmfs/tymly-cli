const c = require('ansi-colors')
const path = require('path')
const fs = require('fs-extra')
const selectInternalModel = require('./select-internal-model')

async function selectModel (blueprint, modelPath) {
  const model = modelPath ? loadExternalModel(modelPath) : await selectInternalModel(blueprint)

  return model
} // selectInternalModel

function loadExternalModel (modelPath) {
  if (!fs.pathExistsSync(modelPath)) {
    console.log(c.bold.red(`Can not find model at ${c.cyan(modelPath)}`))
    return
  }

  const name = path.basename(modelPath, path.extname(modelPath))
  const schema = fs.readJsonSync(modelPath)
  const fields = Object.keys(schema.properties)
  console.log(c.bold(`Loading external model ${c.cyan(schema.title || name)}`))
  return {
    name,
    schema,
    fields
  }
} // loadExternalModel

module.exports = selectModel
