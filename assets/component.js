'use strict'

Game.component = {}

Game.component.ballData = {
  'x': Game.canvas.getWidth / 2,
  'y': Game.canvas.getHeight - 30,
  'radius': 10,
  'color': '#2d96ff'
}

Game.component.shiftData = (Base) => class extends Base {
  constructor () {
    super()
    this.dx = 2
    this.dy = -2
  }
}

Game.component.ballShape = (Base) => class extends Base {
  constructor () {
    super()
    this.entityName = 'ball'
    this.x = Game.component.ballData.x
    this.y = Game.component.ballData.y
    this.radius = Game.component.ballData.radius
    this.color = Game.component.ballData.color
  }
}

Game.component.drawBallMixin = (Base) => class extends Base {
  drawBall () {
    Game.canvas.ctx.beginPath()
    Game.canvas.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    Game.canvas.ctx.fillStyle = this.color
    Game.canvas.ctx.fill()
    Game.canvas.ctx.closePath()
  }
}
