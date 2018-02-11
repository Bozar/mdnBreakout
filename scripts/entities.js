'use strict'

Game.entities = {}
Game.entities.entitiesList = []

Game.entities.ball = new Game.Entity('ball')
Game.entities.ball.addComponent(new Game.Components.Shape(10))
Game.entities.ball.addComponent(new Game.Components.Position(
  Game.canvas.getWidth() / 2, Game.canvas.getHeight() - 30))
Game.entities.ball.addComponent(new Game.Components.Shift(2, -2))
Game.entities.entitiesList.push(Game.entities.ball)

Game.entities.paddle = new Game.Entity('paddle')
Game.entities.paddle.addComponent(new Game.Components.Shape(0, 75, 10))
Game.entities.paddle.addComponent(new Game.Components.Position(
  (Game.canvas.getWidth() - Game.entities.paddle.shape.width) / 2,
  Game.canvas.getHeight() - Game.entities.paddle.shape.height))
Game.entities.paddle.addComponent(new Game.Components.MovePaddle())
Game.entities.entitiesList.push(Game.entities.paddle)

Game.entities.brickBlueprint = new Game.Entity('brickBlueprint')
Game.entities.brickBlueprint.addComponent(new Game.Components.Arrangement())
Game.entities.brickBlueprint.addComponent(new Game.Components.ArraySize())

Game.entities.brickCreation = (function () {
  let e = Game.entities
  let blueprint = e.brickBlueprint

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

      Game.entities.entitiesList.push(brick)
    }
  }
}())
