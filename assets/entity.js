'use strict'

Game.entity = {}

Game.entity.ball = new class extends
  Game.component.drawBallMixin(
    Game.component.shiftData(
      Game.component.ballShape(
        class { }
      )
    )
  ) { }()
