'use strict'

var Game = {}

Game.canvas = {}
Game.canvas.getElement = document.getElementById('myCanvas')
Game.canvas.ctx = Game.canvas.getElement.getContext('2d')

function drawShapes () {
  let ctx = Game.canvas.ctx

  ctx.beginPath()
  ctx.rect(20, 40, 50, 50)
  ctx.fillStyle = '#FF0000'
  ctx.fill()
  ctx.closePath()

  ctx.beginPath()
  ctx.arc(240, 160, 20, 0, Math.PI * 2, false)
  ctx.fillStyle = 'green'
  ctx.fill()
  ctx.closePath()

  ctx.beginPath()
  ctx.rect(160, 10, 100, 40)
  ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)'
  ctx.stroke()
  ctx.closePath()
}

console.log('hello world')
drawShapes()
