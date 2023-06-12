export default (canvas, context) => {

   const contextSetter = () => {
      const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, 'white')
      gradient.addColorStop(0.5, 'magenta')
      gradient.addColorStop(1, 'blue')
      context.fillStyle = gradient
      context.strokeStyle = 'white'
   }

   class Particle {
      constructor(effect, canvas) {
         this.canvas = canvas;
         this.effect = effect;
         this.radius = random(20, 5);
         //=> make all particles visible
         this.x = this.radius + Math.random() * (this.canvas.width - this.radius * 2);
         this.y = this.radius + Math.random() * (this.canvas.height - this.radius * 2);
         this.colliding = false
         this.collisionForce = 2.5;
         this.color = 'green'
      }
      draw(ctx) {
         // ctx.fillStyle = `hsl( ${(this.x + this.y) * .3}, 100%, 50%)`
         ctx.beginPath();
         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
         ctx.fillStyle = this.color
         ctx.fill()
      }
      update(ctx) {

         if (this.colliding) console.log('collision particle')
         this.color = this.colliding ? "red" : "green"
         // useStatusText(ctx, JSON.stringify(this.colliding), {
         //    x: self.x - self.radius * 4,
         //    y: self.y - self.radius * 2
         // }, '20', this.canvas)

      }
      push() {
         if (this.x > this.effect.width || this.x < 0) this.x = this.effect.width
      }
   }


   class Player {
      constructor(effect, canvas, input) {
         this.effect = effect;
         this.canvas = canvas;
         this.input = input;
         this.radius = random(30, 15);
         //=> make all particles visible
         this.x = this.radius + Math.random() * (this.canvas.width - this.radius * 2);
         this.y = this.radius + Math.random() * (this.canvas.height - this.radius * 2);
         this.vx = this.radius * .05
         this.vy = this.radius * .05
         this.pushX = 0
         this.pushY = 0
         this.colliding = false
         this.collisionForce = 2.5;
         this.friction = 0.96
         this.color = 'green'
      }
      draw(ctx) {
         // ctx.fillStyle = `hsl( ${(this.x + this.y) * .3}, 100%, 50%)`
         ctx.beginPath();
         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
         ctx.fillStyle = this.color
         ctx.fill()
      }
      update(ctx) {

         if (this.colliding) console.log('collision player')
         // useStatusText(ctx, JSON.stringify(this.colliding), {
         //    x: self.x - self.radius * 4,
         //    y: self.y - self.radius * 2
         // }, '20', this.canvas)

         this.color = this.colliding ? "red" : "green"
         this.pushY += this.input.pressedKeys.includes('push down') ? .5 * this.vy : 0
         this.pushY += this.input.pressedKeys.includes('push up') ? -.5 * this.vy : 0

         this.pushX += this.input.pressedKeys.includes('push right') ? .5 * this.vx : 0
         this.pushX += this.input.pressedKeys.includes('push left') ? -.5 * this.vx : 0

         this.x += (this.pushX *= this.friction)
         this.y += (this.pushY *= this.friction)


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

   class Effect {
      constructor(canvas, input) {
         this.canvas = canvas;
         this.width = this.canvas.width;
         this.height = this.canvas.height;
         this.entities = []
         this.player = new Player(this, canvas, input)

         this.createEntities()

         window.addEventListener('resize', e => {
            this.width = this.canvas.width = e.target.window.innerWidth
            this.height = this.canvas.height = e.target.window.innerHeight
            contextSetter()
            // this.particles.forEach(particle => particle.reset())
         })
      }
      createEntities() {
         for (let i = 0; i < 5; i++) {
            const particle = new Particle(this, canvas)
            this.entities.push(particle)
         }
      }
      handlePlayers() {
         this.player.draw(context)
         this.player.update(context)
         this.entities.forEach(entity => {
            entity.draw(context)
            entity.update(context)
         })
      }
      detectCollisions() {
         let playerCollision = false;
         for (let a = 0; a < this.entities.length; a++) {
            const
               e1 = this.entities[a],
               e2 = this.player,
               dx = Math.abs(e2.x - e1.x),
               dy = Math.abs(e2.y - e1.y),
               distance = Math.hypot(dx, dy),
               distanceRadius = e2.radius + e1.radius

            const collision = distance <= distanceRadius

            this.entities[a].colliding = collision

            if (collision) {
               playerCollision = true;
               const angle = Math.atan2(dy, dx);
               // Calculate push direction for each entity
               const pushX = Math.cos(angle);
               const pushY = Math.sin(angle);
               this.entities[a].x -= pushX * e1.collisionForce;
               this.entities[a].y -= pushY * e1.collisionForce;
               this.player.x += pushX * e2.collisionForce;
               this.player.y += pushY * e2.collisionForce;
            }
         }

         this.player.colliding = playerCollision;
      }
   }
   const random = (last, first = 0) => {
      return Math.random() * last + first
   }

   const input = new useInputs()
   const effect = new Effect(canvas, input)

   contextSetter()

   const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      effect.handlePlayers(context)
      effect.detectCollisions()
      useStatusText(context, input.lastKey, {
         x: 50,
         y: 100
      }, '50', canvas)
      //
      requestAnimationFrame(animate)
   }

   animate()
}

