'use strict'

Game.entity = {}

Game.entity.ball = new class extends
  Game.component.drawBallMixin(
    Game.component.ballData
  ) { }()

Game.entity.paddle = new class extends
  Game.component.drawPaddleMixin(
    Game.component.paddleData
  ) { }()
