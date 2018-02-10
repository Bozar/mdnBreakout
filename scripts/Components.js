'use strict'

Game.Components = {}

Game.Components.Position = function (x, y) {
  this.name = 'position'

  this.x = x
  this.y = y
}

Game.Components.Shift = function (dx, dy) {
  this.name = 'shift'

  this.dx = dx || 0
  this.dy = dy || 0
}

Game.Components.Shape = function (radius, width, height, color) {
  this.name = 'shape'

  this.color = color || '#2d96ff'
  this.width = width > 0 ? width : undefined
  this.height = height > 0 ? height : undefined
  this.radius = radius > 0 ? radius : undefined
}

Game.Components.MovePaddle = function (distance) {
  this.name = 'movePaddle'

  this.distance = distance || 7
}
