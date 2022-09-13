const Paper = require('paper')
const p = Paper
Paper.install(window);

window.onload = function() {


  let sunsetSpeed = 0.004
  const canvas = document.querySelector('#stars')
  let windowWidth = window.innerWidth
  let windowHeight = window.innerHeight
  const totalStars = (windowWidth * windowHeight) / 1000

  canvas.style.width = windowWidth
  canvas.style.height = windowHeight

  p.setup(canvas)

  class Star {
    constructor() {
      this.x = this.getRandomInt(1, windowWidth)
      this.y = this.getRandomInt(1, windowHeight)
      this.radius = this.getRandomArbitrary(0.2, 1.2)
      this.colour = '#F0E6C6'
      this.opacity = 0
      this.animationOffset = this.getRandomArbitrary(0, 10)
      this.start = this.getRandomInt(0, 5)
      this.twinkle = this.getRandomInt(0, 3) === 0
      this.star = null
      this.complete = false
      this.moving = this.getRandomInt(0,100) > 97
      this.direction = this.getRandomInt(0,628) / 100
      this.dx = 0
      this.dy = 0
    }
    getRandomInt = function(min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    }
    getRandomArbitrary = function(min, max) {
      return Math.random() * (max - min) + min
    }
    create() {
      this.star = new p.Shape.Circle(new p.Point(this.x, this.y), this.radius)
      this.star.fillColor = this.colour
      this.star.opacity = 0
      this.dx = Math.cos(this.direction) * windowWidth / 700
      this.dy = Math.sin(this.direction) * windowHeight / 1400
    }
    reposition() {
      this.x = this.getRandomInt(1, windowWidth)
      this.y = this.getRandomInt(1, windowHeight)
      this.star.position = new p.Point(this.x, this.y)
    }
    update(event, twinkle) {
      let change = 0.3 - 0.3 * Math.sin(2 * event.time + this.animationOffset)
      this.star.opacity = change
      if (this.moving) {
        if (this.x + this.dx > windowWidth) {
          this.x = 0
        } else if (this.x + this.dx < 0) {
          this.x = windowWidth
        } else {
          this.x += this.dx
        }
        if (this.y + this.dy > windowHeight) {
          this.y = 0
        } else if (this.y + this.dy < 0) {
          this.y = windowHeight
        } else {
          this.y += this.dy
        }
        this.star.position = new p.Point(this.x, this.y)
      }
    }

      }

      let rectangle = null
      const background = new p.Layer()


      function drawSky() {
        background.activate()
        windowWidth = window.innerWidth
        windowHeight = window.innerHeight
        rectangle = new p.Shape.Rectangle({
          point: [0, 0],
          size: new p.Size(windowWidth, windowHeight),
          fillColor: {
            gradient: {
              stops: ['#e2dedb', '#a5b6ca', '#6795ca', '#5d5fb9'],
            },
            origin: [0, window.innerHeight],
            destination: [0, 0]
          }
        })
      }

      drawSky()

      const sky = new p.Layer()
      sky.blendMode  = 'lighten'
      sky.opacity = 0

      const stars = [];
      for (let i = 0; i < totalStars; i++) {
        const star = new Star()
        star.create()
        stars.push(star)
      }

      p.view.draw()

      function handleResize() {
        windowWidth = window.innerWidth
        windowHeight = window.innerHeight
        // p.view.setViewSize(new p.Size(windowWidth, windowHeight));
        background.activate()
        rectangle.position = new Point(windowWidth/2,windowHeight/2)
        rectangle.set({size: [windowWidth, windowHeight]})
        repositionStars()
      }
      window.addEventListener('resize', handleResize)

      function repositionStars() {
        for (var i = 0; i < totalStars; i++) {
          stars[i].reposition()
        }
      }


    p.view.onFrame = function(event) {
      if (sky.opacity < 1) {
        sky.opacity += 0.005
      }
      for (var i = 0; i < totalStars; i++) {
        stars[i].update(event)
      }
      if (rectangle.fillColor.gradient.stops[0].color.red > (34/255)) {
        rectangle.fillColor.gradient.stops[0].color.red -= sunsetSpeed
      }
      if (rectangle.fillColor.gradient.stops[0].color.green > (16/255)) {
        rectangle.fillColor.gradient.stops[0].color.green -= sunsetSpeed
      }
      if (rectangle.fillColor.gradient.stops[0].color.blue > (56/255)) {
        rectangle.fillColor.gradient.stops[0].color.blue -= sunsetSpeed
      }
      if (rectangle.fillColor.gradient.stops[1].color.red > (30/255)) {
        rectangle.fillColor.gradient.stops[1].color.red -= sunsetSpeed
      }
      if (rectangle.fillColor.gradient.stops[1].color.green > (12/255)) {
        rectangle.fillColor.gradient.stops[1].color.green -= sunsetSpeed
      }
      if (rectangle.fillColor.gradient.stops[1].color.blue > (52/255)) {
        rectangle.fillColor.gradient.stops[1].color.blue -= sunsetSpeed
      }
      if (rectangle.fillColor.gradient.stops[2].color.red > (14/255)) {
        rectangle.fillColor.gradient.stops[2].color.red -= sunsetSpeed
      }
      if (rectangle.fillColor.gradient.stops[2].color.green > (2/255)) {
        rectangle.fillColor.gradient.stops[2].color.green -= sunsetSpeed
      }
      if (rectangle.fillColor.gradient.stops[2].color.blue > (36/255)) {
        rectangle.fillColor.gradient.stops[2].color.blue -= sunsetSpeed
      }
      if (rectangle.fillColor.gradient.stops[3].color.red > (12/255)) {
        rectangle.fillColor.gradient.stops[3].color.red -= sunsetSpeed
      }
      if (rectangle.fillColor.gradient.stops[3].color.green > (0/255)) {
        rectangle.fillColor.gradient.stops[3].color.green -= sunsetSpeed
      }
      if (rectangle.fillColor.gradient.stops[3].color.blue > (34/255)) {
        rectangle.fillColor.gradient.stops[3].color.blue -= sunsetSpeed
      }
    }
  }