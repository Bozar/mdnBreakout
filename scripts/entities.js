'use strict'

Game.entities = {}
Game.entities.entitiesList = []

Game.entities.ball = new Game.Entity()
Game.entities.ball.addComponent(new Game.Components.Shape(10))
Game.entities.ball.addComponent(new Game.Components.Position(
  Game.canvas.getWidth() / 2, Game.canvas.getHeight() - 30))
Game.entities.ball.addComponent(new Game.Components.Shift(2, -2))
Game.entities.entitiesList.push(Game.entities.ball)

Game.entities.paddle = new Game.Entity()
Game.entities.paddle.addComponent(new Game.Components.Shape(0, 75, 10))
Game.entities.paddle.addComponent(new Game.Components.Position(
  (Game.canvas.getWidth() - Game.entities.paddle.components.shape.width) / 2,
  Game.canvas.getHeight() - Game.entities.paddle.components.shape.height))
Game.entities.entitiesList.push(Game.entities.paddle)
