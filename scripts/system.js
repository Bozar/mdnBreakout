'use strict'

Game.system = {}

Game.system.drawBall = function (entities) {
  for (let i = 0; i < entities.length; i++) {
    let e = entities[i]

    if (e.shape && e.shape.radius) {
      Game.canvas.ctx.beginPath()
      Game.canvas.ctx.arc(e.position.x, e.position.y,
        e.shape.radius, 0, Math.PI * 2)
      Game.canvas.ctx.fillStyle = e.shape.color
      Game.canvas.ctx.fill()
      Game.canvas.ctx.closePath()
    }
  }
}

Game.system.drawPaddle = function (entities) {
  for (let i = 0; i < entities.length; i++) {
    let e = entities[i]

    if (e.shape && e.shape.width && e.shape.height) {
      Game.canvas.ctx.beginPath()
      Game.canvas.ctx.rect(e.position.x, e.position.y,
        e.shape.width, e.shape.height)
      Game.canvas.ctx.fillStyle = e.shape.color
      Game.canvas.ctx.fill()
      Game.canvas.ctx.closePath()
    }
  }
}

Game.system.moveElement = function (entities) {
  for (let i = 0; i < entities.length; i++) {
    let e = entities[i]

    if (e.shift && e.position) {
      e.position.x += e.shift.dx
      e.position.y += e.shift.dy
    }
  }
}

Game.system.bounceOffWall = function (entities) {
  for (let i = 0; i < entities.length; i++) {
    let e = entities[i]

    if (e.shift && e.position && e.shape && e.shape.radius) {
      if ((e.position.x + e.shift.dx >
        Game.canvas.getWidth() - e.shape.radius) ||
        (e.position.x + e.shift.dx < e.shape.radius)) {
        e.shift.dx = -e.shift.dx
      }

      if ((e.position.y + e.shift.dy >
        Game.canvas.getHeight() - e.shape.radius) ||
        (e.position.y + e.shift.dy < e.shape.radius)) {
        e.shift.dy = -e.shift.dy
      }
    }
  }
}
