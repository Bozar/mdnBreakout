'use strict'

var Game = {}

Game.canvas = {}
Game.canvas.getElement = document.getElementById('myCanvas')
Game.canvas.ctx = Game.canvas.getElement.getContext('2d')
Game.canvas.clearCanvas = function () {
  this.ctx.clearRect(0, 0, this.getWidth(), this.getHeight())
}
Game.canvas.getWidth = function () { return this.getElement.width }
Game.canvas.getHeight = function () { return this.getElement.height }

window.onload = function () {
  let el = Game.entities.entitiesList
  setInterval(() => {
    Game.canvas.clearCanvas()
    Game.system.drawBall(el)
    Game.system.drawPaddle(el)
    Game.system.moveElement(el)
    Game.system.bounceOffWall(el)
  }, 10)
}
