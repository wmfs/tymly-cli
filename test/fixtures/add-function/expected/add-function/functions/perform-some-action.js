
function performSomeAction (formData) {
  // do something here

  // then return the (possibly modified) formData
  return formData
}

module.exports = function () {
  return performSomeAction
}
