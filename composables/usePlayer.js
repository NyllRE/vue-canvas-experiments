export default class Player {
   constructor(effect, canvas, input) {
      this.effect = effect;
      this.canvas = canvas;
      this.input = input;
      this.radius = 80;
      //=> make all particles visible
      this.x = this.radius + Math.random() * (this.canvas.width - this.radius * 2);
      this.y = this.radius + Math.random() * (this.canvas.height - this.radius * 2);
      this.vx = this.radius * .02
      this.vy = this.radius * .02
      this.controlSpeed = .5
      this.pushX = 0
      this.pushY = 0
      this.colliding = false
      this.collisionForce = 1;
      this.collisionAngle = 0
      this.friction = 0.96
      this.mainColor = `hsl(${random(360)}, 100%, 50%)`
      this.color = this.mainColor
   }
   draw(ctx) {
      // ctx.fillStyle = `hsl( ${(this.x + this.y) * .3}, 100%, 50%)`
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      ctx.fillStyle = this.color
      ctx.fill()
   }
   update(ctx) {

      this.color = this.colliding ? "red" : this.mainColor
      this.pushY += this.input.pressedKeys.includes('down') ? this.controlSpeed * this.vy : 0
      this.pushY += this.input.pressedKeys.includes('up') ? -this.controlSpeed * this.vy : 0

      this.pushX += this.input.pressedKeys.includes('right') ? this.controlSpeed * this.vx : 0
      this.pushX += this.input.pressedKeys.includes('left') ? -this.controlSpeed * this.vx : 0

      if (this.colliding) {
         const
            pushX = Math.cos(this.collisionAngle),
            pushY = Math.sin(this.collisionAngle);

         this.pushX += pushX;
         this.pushY += pushY;
         this.x += (this.pushX *= this.friction) * this.collisionForce;
         this.y += (this.pushY *= this.friction) * this.collisionForce;
      } else {
         this.x += (this.pushX *= this.friction)
         this.y += (this.pushY *= this.friction)
      }

      useStatusText(ctx, JSON.stringify(this.colliding), {
         x: self.x - self.radius * 4,
         y: self.y - self.radius * 2
      }, '20', this.canvas)




      if (this.x < this.radius) {
         this.x = this.radius;
         this.pushX *= -1;
      } else if (this.x > this.effect.width - this.radius) {
         this.x = this.effect.width - this.radius;
         this.pushX *= -1;
      }
      if (this.y < this.radius) {
         this.y = this.radius;
         this.pushY *= -1;
      } else if (this.y > this.effect.height - this.radius) {
         this.y = this.effect.height - this.radius;
         this.pushY *= -1;
      }

   }
   push() {
      if (this.x > this.effect.width || this.x < 0) this.x = this.effect.width
   }
}

const random = (last, first = 0) => {
   return Math.random() * last + first
}