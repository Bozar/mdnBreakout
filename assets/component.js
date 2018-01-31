'use strict'

Game.component = {}

Game.component.ballData = class {
  constructor () {
    this.entityName = 'ball'
    this.x = Game.canvas.getWidth / 2
    this.y = Game.canvas.getHeight - 30
    this.radius = 10
    this.color = '#2d96ff'
    this.dX = 2
    this.dY = -2
  }
}

Game.component.paddleData = class {
  constructor () {
    this.entityName = 'paddle'
    this.height = 10
    this.width = 75
    this.x = (Game.canvas.getWidth - this.width) / 2
    this.color = '#2d96ff'
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

Game.component.drawPaddleMixin = (Base) => class extends Base {
  drawPaddle () {
    Game.canvas.ctx.beginPath()
    Game.canvas.ctx.rect(
      this.x, Game.canvas.getHeight - this.height, this.width, this.height)
    Game.canvas.ctx.fillStyle = this.color
    Game.canvas.ctx.fill()
    Game.canvas.ctx.closePath()
  }
}
