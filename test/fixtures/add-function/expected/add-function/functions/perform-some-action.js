
function performSomeAction (event) {
  // do something here

  // then return the (possibly modified) event, or whatever else
  return event
}

module.exports = function () {
  return performSomeAction
}
