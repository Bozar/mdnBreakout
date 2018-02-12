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

Game.system.drawUI = function (entities) {
  for (let i = 0; i < entities.length; i++) {
    let e = entities[i]

    Game.canvas.ctx.font = e.ui.font
    Game.canvas.ctx.fillStyle = e.shape.color
    Game.canvas.ctx.fillText(e.ui.text + e.ui.value, e.position.x, e.position.y)
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
  let ge = Game.entities
  let paddle = ge.paddle

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
          ge.uiLife.ui.value -= ge.uiLife.ui.change
          ge.uiScore.ui.value += ge.uiLife.ui.change

          if (Game.entities.uiLife.ui.value < 0) {
            window.alert('Game Over')
            document.location.reload()
          } else {
            ge.ball.position.x = ge.initialValues.ballX
            ge.ball.position.y = ge.initialValues.ballY
            ge.ball.shift.dx = (Math.random() > 0.5 ? 1 : -1) * 2
            ge.ball.shift.dy = (Math.random() > 0.5 ? 1 : -1) * 2
            ge.paddle.position.x = ge.initialValues.paddleX
          }
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

      Game.entities.uiScore.ui.value += Game.entities.uiScore.ui.change
      entities.splice(i, 1)
      break
    }
  }
}

Game.system.win = function () {
  if (Game.entities.mapList.get('brick').length === 0) {
    window.alert('You Win!\nFinal Score: ' + Game.entities.uiScore.ui.value)
    document.location.reload()
  }
}

Game.system.saveInitialValues = function () {
  let e = Game.entities

  e.initialValues.ballX = e.ball.position.x
  e.initialValues.ballY = e.ball.position.y
  e.initialValues.ballDx = e.ball.shift.dx
  e.initialValues.ballDy = e.ball.shift.dy
  e.initialValues.paddleX = e.paddle.position.x
}
