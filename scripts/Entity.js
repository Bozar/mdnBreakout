'use strict'

Game.Entity = function (name) {
  this.id = (function () {
    // 12345678-{repeat}-{repeat}-{repeat}
    let randomNumber = ''

    while (randomNumber.length < 32) {
      randomNumber += (Math.random() * Math.pow(10, 8) | 0).toString(16)
    }
    return randomNumber.replace(/.{8}/g, '$&' + '-').slice(0, 35)
  }())

  this.entityName = name
}

Game.Entity.prototype.getID = function () { return this.id }

Game.Entity.prototype.addComponent = function (component) {
  this[component.name] = component
}

Game.Entity.prototype.removeComponent = function (name) {
  delete this[name]
}

Game.Entity.prototype.print = function () {
  console.log(JSON.stringify(this, null, 2))
}
