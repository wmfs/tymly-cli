const forms = require('./add-form')

module.exports = {
  initAction: require('./init'),
  newBlueprintAction: require('./new-blueprint'),
  addModelAction: require('./add-model'),
  addStateMachine: require('./add-state-machine'),
  addCategory: require('./add-category'),
  addRole: require('./add-role'),
  addSearchDoc: require('./add-search-doc'),
  addEditableAction: forms.addEditable,
  addViewableAction: forms.addViewable,
  addFunction: require('./add-function')
}
