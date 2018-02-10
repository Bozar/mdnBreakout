'use strict'

Game.system = {}

Game.system.drawBall = function (entities) {
  for (let i = 0; i < entities.length; i++) {
    let ec = entities[i].components

    if (ec.shape && ec.shape.radius) {
      Game.canvas.ctx.beginPath()
      Game.canvas.ctx.arc(ec.position.x, ec.position.y,
        ec.shape.radius, 0, Math.PI * 2)
      Game.canvas.ctx.fillStyle = ec.shape.color
      Game.canvas.ctx.fill()
      Game.canvas.ctx.closePath()
    }
  }
}

Game.system.drawPaddle = function (entities) {
  for (let i = 0; i < entities.length; i++) {
    let ec = entities[i].components

    if (ec.shape && ec.shape.width && ec.shape.height) {
      Game.canvas.ctx.beginPath()
      Game.canvas.ctx.rect(ec.position.x, ec.position.y,
        ec.shape.width, ec.shape.height)
      Game.canvas.ctx.fillStyle = ec.shape.color
      Game.canvas.ctx.fill()
      Game.canvas.ctx.closePath()
    }
  }
}

Game.system.moveElement = function (entities) {
  for (let i = 0; i < entities.length; i++) {
    let ec = entities[i].components

    if (ec.shift && ec.position) {
      ec.position.x += ec.shift.dx
      ec.position.y += ec.shift.dy
    }
  }
}

Game.system.bounceOffWall = function (entities) {
  for (let i = 0; i < entities.length; i++) {
    let ec = entities[i].components

    if (ec.shift && ec.position && ec.shape && ec.shape.radius) {
      if ((ec.position.x + ec.shift.dx >
        Game.canvas.getWidth() - ec.shape.radius) ||
        (ec.position.x + ec.shift.dx < ec.shape.radius)) {
        ec.shift.dx = -ec.shift.dx
      }

      if ((ec.position.y + ec.shift.dy >
        Game.canvas.getHeight() - ec.shape.radius) ||
        (ec.position.y + ec.shift.dy < ec.shape.radius)) {
        ec.shift.dy = -ec.shift.dy
      }
    }
  }
}
