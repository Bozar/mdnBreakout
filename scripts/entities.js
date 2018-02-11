'use strict'

Game.entities = {}
Game.entities.entitiesList = new Map()
Game.entities.entitiesList.set('movable', [])
Game.entities.entitiesList.set('brick', [])

Game.entities.ball = new Game.Entity('ball')
Game.entities.ball.addComponent(new Game.Components.Shape(10))
Game.entities.ball.addComponent(new Game.Components.Position(
  Game.canvas.getWidth() / 2, Game.canvas.getHeight() - 30))
Game.entities.ball.addComponent(new Game.Components.Shift(2, -2))
Game.entities.entitiesList.get('movable').push(Game.entities.ball)

Game.entities.paddle = new Game.Entity('paddle')
Game.entities.paddle.addComponent(new Game.Components.Shape(0, 75, 10))
Game.entities.paddle.addComponent(new Game.Components.Position(
  (Game.canvas.getWidth() - Game.entities.paddle.shape.width) / 2,
  Game.canvas.getHeight() - Game.entities.paddle.shape.height))
Game.entities.paddle.addComponent(new Game.Components.MovePaddle())
Game.entities.entitiesList.get('movable').push(Game.entities.paddle)

Game.entities.brickCreation = function () {
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

      Game.entities.entitiesList.get('brick').push(brick)
    }
  }
}
Game.entities.brickCreation()
