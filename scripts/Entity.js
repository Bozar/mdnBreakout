'use strict'

Game.Entity = function () {
  this.id = (function () {
    // 12345678-{repeat}-{repeat}-{repeat}
    var randomNumber = ''

    while (randomNumber.length < 32) {
      randomNumber += (Math.random() * Math.pow(10, 8) | 0).toString(16)
    }
    return randomNumber.replace(/.{8}/g, '$&' + '-').slice(0, 35)
  }())

  this.components = {}
}

Game.Entity.prototype.addComponent = function (component) {
  this.components[component.name] = component
}

Game.Entity.prototype.removeComponent = function (name) {
  delete this.components[name]
}

Game.Entity.prototype.print = function () {
  console.log(JSON.stringify(this, null, 2))
}
