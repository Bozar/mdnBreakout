'use strict'

var Game = {}

Game.canvas = {}
Game.canvas.getElement = document.getElementById('myCanvas')
Game.canvas.ctx = Game.canvas.getElement.getContext('2d')
Game.canvas.clearCanvas = function () {
  this.ctx.clearRect(0, 0, this.getElement.width, this.getElement.height)
}

window.onload = function () {
  setInterval(() => {
    Game.canvas.clearCanvas()
    Game.entity.ball.drawBall()
    Game.system.moveElement(Game.entity.ball)
    Game.system.bounceOffWall(Game.entity.ball)
  }, 10)
}
