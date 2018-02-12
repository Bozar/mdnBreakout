'use strict'

Game.entities = {}
Game.entities.mapList = new Map()
Game.entities.mapList.set('movable', [])
Game.entities.mapList.set('brick', [])
Game.entities.mapList.set('ui', [])

Game.entities.create = function () {
  for (const key in this.create) {
    if (this.create.hasOwnProperty(key)) {
      this.create[key]()
    }
  }
}

Game.entities.create.ball = function () {
  Game.entities.ball = new Game.Entity('ball')
  Game.entities.ball.addComponent(new Game.Components.Shape(10))
  Game.entities.ball.addComponent(new Game.Components.Position(
    Game.canvas.getWidth() / 2, Game.canvas.getHeight() - 30))
  Game.entities.ball.addComponent(new Game.Components.Shift(
    (Math.random() > 0.5 ? 1 : -1) * 2, (Math.random() > 0.5 ? 1 : -1) * 2))
  Game.entities.mapList.get('movable').push(Game.entities.ball)
}

Game.entities.create.paddle = function () {
  Game.entities.paddle = new Game.Entity('paddle')
  Game.entities.paddle.addComponent(new Game.Components.Shape(0, 75, 10))
  Game.entities.paddle.addComponent(new Game.Components.Position(
    (Game.canvas.getWidth() - Game.entities.paddle.shape.width) / 2,
    Game.canvas.getHeight() - Game.entities.paddle.shape.height))
  Game.entities.paddle.addComponent(new Game.Components.MovePaddle())
  Game.entities.mapList.get('movable').push(Game.entities.paddle)
}

Game.entities.create.brick = function () {
  let e = Game.entities
  let blueprint = new Game.Entity()
  blueprint.addComponent(new Game.Components.Arrangement())
  blueprint.addComponent(new Game.Components.ArraySize())

  for (let i = 0; i < blueprint.arraySize.row; i++) {
    for (let j = 0; j < blueprint.arraySize.column; j++) {
      e['brick' + j + i] = new Game.Entity('brick' + j + i)
      let brick = e['brick' + j + i]

      brick.addComponent(new Game.Components.Shape(0, 75, 20))
      brick.addComponent(new Game.Components.Position(
        j * (brick.shape.width + blueprint.arrangement.padding) +
        blueprint.arrangement.offsetLeft,
        i * (brick.shape.height + blueprint.arrangement.padding) +
        blueprint.arrangement.offsetTop
      ))

      Game.entities.mapList.get('brick').push(brick)
    }
  }
}

Game.entities.create.ui = function () {
  let e = Game.entities

  e.uiScore = new Game.Entity('uiScore')
  e.uiScore.addComponent(new Game.Components.UI('Score: ', 0, 100))
  e.uiScore.addComponent(new Game.Components.Position(8, 20))
  e.uiScore.addComponent(new Game.Components.Shape())

  Game.entities.mapList.get('ui').push(e.uiScore)

  e.uiLife = new Game.Entity('uiLife')
  e.uiLife.addComponent(new Game.Components.UI('Lives: ', 5, 1))
  e.uiLife.addComponent(new Game.Components.Position(
    Game.canvas.getWidth() - 65, 20))
  e.uiLife.addComponent(new Game.Components.Shape())

  Game.entities.mapList.get('ui').push(e.uiLife)
}

Game.entities.create.initialValues = function () {
  let e = Game.entities

  e.initialValues = new Game.Entity('initialValues')
  e.initialValues.addComponent(new Game.Components.InitialValues())
}
