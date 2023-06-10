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
         this.radius = 20;
         //=> make all particles visible
         this.x = this.radius + Math.random() * (this.canvas.width - this.radius * 2);
         this.y = this.radius + Math.random() * (this.canvas.height - this.radius * 2);
         this.vx = 0
         this.vy = 0
         this.pushX = 0
         this.pushY = 0
         this.friction = 0.96
      }
      draw(ctx) {
         // ctx.fillStyle = `hsl( ${(this.x + this.y) * .3}, 100%, 50%)`
         ctx.beginPath();
         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
         ctx.fill()
         ctx.filter = 'none'
      }
      update() {

         this.pushY +=
            this.input.lastKey == 'push down' ? .5
               : this.input.lastKey == 'push up' ? -.5
                  : 0

         this.pushX +=
            this.input.lastKey == 'push right' ? .5
               : this.input.lastKey == 'push left' ? -.5
                  : 0




         this.x += (this.pushX *= this.friction) + this.vx
         this.y += (this.pushY *= this.friction) + this.vy


         if (this.x < this.radius) {
            this.x = this.radius;
            this.vx *= -1;
         } else if (this.x > this.effect.width - this.radius) {
            this.x = this.effect.width - this.radius;
            this.vx *= -1;
         }
         if (this.y < this.radius) {
            this.y = this.radius;
            this.vy *= -1;
         } else if (this.y > this.effect.height - this.radius) {
            this.y = this.effect.height - this.radius;
            this.vy *= -1;
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
         this.player = new Player(this, canvas, input)


         window.addEventListener('resize', e => {
            this.width = this.canvas.width = e.target.window.innerWidth
            this.height = this.canvas.height = e.target.window.innerHeight
            contextSetter()
            this.particles.forEach(particle => particle.reset())
         })
      }
      handlePlayer() {
         this.player.draw(context)
         this.player.update()
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
      effect.handlePlayer(context)
      useStatusText(context, input, {
         x: 50,
         y: 100
      })
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