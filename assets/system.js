'use strict'

Game.system = {}

Game.system.ErrorMessage = function (message) {
  this.message = message
}

Game.system.hasMixins = function (checkObject, mixinArray) {
  try {
    for (const i of mixinArray) {
      if (!(i in checkObject)) {
        throw new this.ErrorMessage(
          i + ' does NOT exist in ' + checkObject.entityName + '!')
      }
    }
  } catch (error) {
    if (error instanceof this.ErrorMessage) {
      console.log(error.message)
    } else {
      console.log(error)
    }
    return false
  }
  return true
}

Game.system.moveElement = (element) => {
  if (!Game.system.hasMixins(Game.entity.ball, ['x', 'y', 'dx', 'dy'])) {
    return false
  }
  element.x += element.dx
  element.y += element.dy
  return true
}
