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

Game.system.moveElement = function (element) {
  if (!Game.system.hasMixins(Game.entity.ball, ['x', 'y', 'dX', 'dY'])) {
    return false
  }
  element.x += element.dX
  element.y += element.dY
  return true
}

Game.system.bounceOffWall = function (element) {
  if (!Game.system.hasMixins(Game.entity.ball,
    ['x', 'y', 'dX', 'dY', 'radius'])) {
    return false
  }
  if (
    (element.x + element.dX > Game.canvas.getWidth - element.radius) ||
    (element.x + element.dX < element.radius)) {
    element.dX = -element.dX
  }
  if (
    (element.y + element.dY > Game.canvas.getHeight - element.radius) ||
    (element.y + element.dY < element.radius)) {
    element.dY = -element.dY
  }
  return true
}
