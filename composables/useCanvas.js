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
      constructor(effect) {
         this.effect = effect;
         this.radius = Math.floor(random(20, 2.5));
         //=> make all particles visible
         this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
         this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
         this.vx = this.radius * .15
         this.vy = this.radius * .15
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
         if (this.effect.mouse.pressed) {
            const
               dx = this.x - this.effect.mouse.x,
               dy = this.y - this.effect.mouse.y,
               distance = Math.hypot(dx, dy);
            if (distance < this.effect.mouse.radius) {
               //=> https://youtu.be/gxagf0WKfBo?t=540
               //=>> Math.atan2 angle calculation explaination
               const
                  angle = Math.atan2(dy, dx),
                  force = this.effect.mouse.radius / distance
               this.pushX += Math.cos(angle) * force;
               this.pushY += Math.sin(angle) * force;
            }

         }

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


         /*
         if (this.x > this.effect.width || this.x < 0) this.vx *= -1
         if (this.y > this.effect.height || this.y < 0) this.vy *= -1
         */
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
         this.particles = []
         this.numOfParticles = 200

         if (this.width > this.height) {
            this.mouse = {
               x: this.width / 3,
               y: this.height / 2,
               pressed: true,
               pressed2: false,
               radius: 300
            }
         } else {
            this.mouse = {
               x: this.width / 2,
               y: this.height / 2,
               pressed: true,
               pressed2: false,
               radius: 150
            }
            this.numOfParticles = 100
         }

         this.createParticles()

         window.addEventListener('resize', e => {
            this.width = this.canvas.width = e.target.window.innerWidth
            this.height = this.canvas.height = e.target.window.innerHeight
            contextSetter()
            this.particles.forEach(particle => particle.reset())
         })
         window.addEventListener('mousemove', e => {
            if (this.mouse.pressed2) {
               this.mouse.x = e.x
               this.mouse.y = e.y
            }
         })
         window.addEventListener('mousedown', e => {
            this.mouse.pressed2 = true
            this.mouse.x = e.x
            this.mouse.y = e.y
         })
         window.addEventListener('mouseup', e => {
            this.mouse.pressed2 = false
            if (this.width > this.height) {
               this.mouse.x = this.width / 3
            } else {
               this.mouse.x = this.width / 2
            }
            this.mouse.y = this.height / 2
         })
      }
      createParticles() {
         for (let i = 0; i < this.numOfParticles; i++) {
            this.particles.push(new Particle(this))
         }
      }
      handleParticles() {
         this.connectParticles()
         this.particles.forEach(particle => {
            particle.draw(context)
            particle.update()
         })
      }
      connectParticles() {
         const maxDistance = 200;
         for (let a = 0; a < this.particles.length; a++) {
            for (let b = a; b < this.particles.length; b++) {
               if (a == b) continue
               const
                  p1 = this.particles[a],
                  p2 = this.particles[b],
                  dx = p1.x - p2.x,
                  dy = p1.y - p2.y,
                  distance = Math.hypot(dx, dy);

               if (distance < maxDistance) {
                  context.save()
                  context.globalAlpha = 1 - (distance / maxDistance)
                  context.beginPath();
                  context.moveTo(p1.x, p1.y)
                  context.lineTo(p2.x, p2.y)
                  context.stroke()
                  context.restore()
               }
            }
         }
      }
   }
   const random = (last, first = 0) => {
      return Math.random() * last + first
   }

   const effect = new Effect(canvas)

   contextSetter()
   const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      effect.handleParticles(context)
      requestAnimationFrame(animate)
   }

   animate()
}