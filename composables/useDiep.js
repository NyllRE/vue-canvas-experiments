export default (canvas, context) => {

   const contextSetter = () => {
      const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, 'white')
      gradient.addColorStop(0.5, 'magenta')
      gradient.addColorStop(1, 'blue')
      context.fillStyle = gradient
      context.strokeStyle = 'white'
   }



   class Player {
      constructor(effect, canvas, input) {
         this.input = input
         this.canvas = canvas;
         this.effect = effect;
         this.radius = random(20, 5);
         //=> make all particles visible
         this.x = this.radius + Math.random() * (this.canvas.width - this.radius * 2);
         this.y = this.radius + Math.random() * (this.canvas.height - this.radius * 2);
         this.vx = this.radius * .05
         this.vy = this.radius * .05
         this.pushX = 0
         this.pushY = 0
         this.collidingX = false
         this.collidingY = false
         this.friction = 0.96
      }
      draw(ctx) {
         // ctx.fillStyle = `hsl( ${(this.x + this.y) * .3}, 100%, 50%)`
         ctx.beginPath();
         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
         ctx.fill()
         ctx.filter = 'none'
      }
      update(ctx) {
         ctx.fillStyle = !this.collidingX || !this.collidingY ? "red" : "green"
         this.pushY +=
            this.input.lastKey == 'push down' ? .5 * this.vy
               : this.input.lastKey == 'push up' ? -.5 * this.vy
                  : 0

         // this.pushX = !this.collidingY ? this.pushX * -1 : this.pushX
         this.pushX +=
            this.input.lastKey == 'push right' ? .5 * this.vx
               : this.input.lastKey == 'push left' ? -.5 * this.vx
                  : 0

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
      constructor(canvas) {
         this.canvas = canvas;
         this.width = this.canvas.width;
         this.height = this.canvas.height;
         this.entities = []

         this.entities.push(new Player(this, canvas, input))
         this.createEntities()

         window.addEventListener('resize', e => {
            this.width = this.canvas.width = e.target.window.innerWidth
            this.height = this.canvas.height = e.target.window.innerHeight
            contextSetter()
            this.particles.forEach(particle => particle.reset())
         })
      }
      createEntities() {
         for (let i = 0; i < 5; i++) {
            const player = new Player(this, canvas, input)
            player.vx = 0
            player.vy = 0
            this.entities.push(player)
         }
      }
      handlePlayers() {
         this.entities.forEach(entity => {
            entity.draw(context)
            entity.update(context)
         })
      }
      detectCollisions() {
         for (let a = 0; a < this.entities.length; a++) {
            for (let b = a; b < this.entities.length; b++) {
               if (a == b) continue
               const
                  e1 = this.entities[a],
                  e2 = this.entities[b],
                  dx = Math.abs(e2.x - e1.x),
                  dy = Math.abs(e2.y - e1.y),
                  distance = Math.sqrt(dx * dx + dy * dy),
                  distanceRadius = e2.radius + e1.radius

               this.entities[a].collidingX = dx > (distanceRadius)
               this.entities[a].collidingY = dy > (distanceRadius)
               this.entities[b].collidingX = dx > (distanceRadius)
               this.entities[b].collidingY = dy > (distanceRadius)

               useStatusText(context, JSON.stringify({ dis: Math.abs(distance) }), {
                  x: e1.x - e1.radius * 4,
                  y: e1.y - e1.radius * 2
               }, '20', canvas)
            }
         }
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


const xInputHandler = (key) => {
   switch (key) {
      case 'push up':
         return -.1
      case 'push down':
         return .1

      case 'release down':
      case 'release up':
         return 0
      default:
         return 0
   }
}