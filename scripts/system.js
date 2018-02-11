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

Game.system.drawRectangle = function (entities) {
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
  let paddle = Game.entities.paddle

  for (let i = 0; i < entities.length; i++) {
    let e = entities[i]

    if (e.shift && e.position && e.shape && e.shape.radius) {
      if ((e.position.x + e.shift.dx >
        Game.canvas.getWidth() - e.shape.radius) ||
        (e.position.x + e.shift.dx < e.shape.radius)) {
        e.shift.dx = -e.shift.dx
      }

      if (e.position.y + e.shift.dy < e.shape.radius) {
        e.shift.dy = -e.shift.dy
      } else if (e.position.y + e.shift.dy >
        Game.canvas.getHeight() - e.shape.radius) {
        if (e.position.x >= paddle.position.x &&
          e.position.x <= paddle.position.x + paddle.shape.width) {
          e.shift.dy = -e.shift.dy
        } else {
          window.alert('Game Over')
          document.location.reload()
        }
      }
    }
  }
}

Game.system.collideWithBricks = function (entities, ball) {
  for (let i = 0; i < entities.length; i++) {
    let e = entities[i]

    if (ball.position.x >= e.position.x &&
      ball.position.x <= e.position.x + e.shape.width &&
      ball.position.y >= e.position.y &&
      ball.position.y <= e.position.y + e.shape.height) {
      ball.shift.dx = -ball.shift.dx
      ball.shift.dy = -ball.shift.dy
      entities.splice(i, 1)
      break
    }
  }
}
