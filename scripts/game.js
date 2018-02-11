'use strict'

var Game = {}

Game.canvas = document.getElementById('myCanvas')
Game.canvas.ctx = Game.canvas.getContext('2d')
Game.canvas.clearCanvas = function () {
  this.ctx.clearRect(0, 0, this.getWidth(), this.getHeight())
}
Game.canvas.getWidth = function () { return this.width }
Game.canvas.getHeight = function () { return this.height }

Game.userControl = {}
Game.userControl.keyMap = new Map()
Game.userControl.keyMap.set('left', ['a', 'ArrowLeft'])
Game.userControl.keyMap.set('right', ['d', 'ArrowRight'])

Game.userControl.addKeys = function (keyMap) {
  this.keyMap.forEach((value, key) => {
    this[key + 'Key'] = value
    this[key + 'Pressed'] = false
  })
}

Game.userControl.listenInput = function () {
  document.addEventListener('keydown', function (e) {
    for (let [key, value] of Game.userControl.keyMap) {
      if (value.indexOf(e.key) > -1) {
        Game.userControl[key + 'Pressed'] = true
        break
      }
    }
  })

  document.addEventListener('keyup', function (e) {
    for (let [key, value] of Game.userControl.keyMap) {
      if (value.indexOf(e.key) > -1) {
        Game.userControl[key + 'Pressed'] = false
        break
      }
    }
  })

  document.addEventListener('mousemove', function (e) {
    let relativeX = e.clientX - Game.canvas.offsetLeft
    let halfWidth = Game.entities.paddle.components.shape.width / 2
    if (relativeX > halfWidth &&
      relativeX < Game.canvas.getWidth() - halfWidth) {
      Game.entities.paddle.components.position.x = relativeX - halfWidth
    }
  })
}

Game.userControl.movePaddle = function () {
  let control = Game.userControl
  let paddle = Game.entities.paddle.components

  if (control.leftPressed && paddle.position.x > 0) {
    paddle.position.x -= paddle.movePaddle.distance
  } else if (control.rightPressed &&
    paddle.position.x < Game.canvas.getWidth() - paddle.shape.width) {
    paddle.position.x += paddle.movePaddle.distance
  }
}

window.onload = function () {
  Game.userControl.addKeys(Game.userControl.keyMap)
  Game.userControl.listenInput()

  let el = Game.entities.entitiesList
  setInterval(function () {
    Game.canvas.clearCanvas()

    Game.system.drawBall(el)
    Game.system.drawPaddle(el)
    Game.system.moveElement(el)
    Game.system.bounceOffWall(el)

    Game.userControl.movePaddle()
  }, 10)
}
