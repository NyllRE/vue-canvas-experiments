export default (canvas, context) => {
   class Particle {
      constructor(effect) {
         this.effect = effect;
         this.radius = random(20, 10);
         //=> make all particles visible
         this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
         this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
         this.vx = this.radius * .05
         this.vy = this.radius * .05
      }
      draw(ctx) {
         ctx.fillStyle = `hsl( ${(this.x + this.y) * .3}, 100%, 50%)`
         ctx.beginPath();
         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
         ctx.fill()
         ctx.stroke()
      }
      update() {
         this.x += this.vx
         if (this.x > this.effect.width || this.x < 0) this.vx *= -1

         this.y += this.vy
         if (this.y > this.effect.height || this.y < 0) this.vy *= -1
      }
   }

   class Effect {
      constructor(canvas) {
         this.canvas = canvas;
         this.width = this.canvas.width;
         this.height = this.canvas.height;
         this.particles = []
         this.numOfParticles = 100
         this.createParticles()
      }
      createParticles() {
         for (let i = 0; i < this.numOfParticles; i++) {
            this.particles.push(new Particle(this))
         }
      }
      handleParticles() {
         this.particles.forEach(particle => {
            particle.draw(context)
            particle.update()
         })
      }
   }
   const random = (last, first = 0) => {
      return Math.random() * last + first
   }

   const effect = new Effect(canvas)

   const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      effect.handleParticles(context)
      requestAnimationFrame(animate)
   }

   animate()
}