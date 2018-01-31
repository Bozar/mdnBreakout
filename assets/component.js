'use strict'

Game.component = {}

Game.component.ballData = {
  'entityName': 'ball',
  'x': Game.canvas.getWidth / 2,
  'y': Game.canvas.getHeight - 30,
  'radius': 10,
  'color': '#2d96ff',
  'dX': 2,
  'dY': -2
}

Game.component.shiftData = (Base) => class extends Base {
  constructor () {
    super()
    switch (this.entityName) {
      case Game.component.ballData.entityName:
        this.dx = Game.component.ballData.dX
        this.dy = Game.component.ballData.dY
        break
      default:
        this.dx = null
        this.dy = null
        break
    }
  }
}

Game.component.ballShape = (Base) => class extends Base {
  constructor () {
    super()
    this.entityName = Game.component.ballData.entityName
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
