export default (canvas, context) => {

   const contextSetter = () => {
      const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, 'white')
      gradient.addColorStop(0.5, 'magenta')
      gradient.addColorStop(1, 'blue')
      context.fillStyle = gradient
      context.strokeStyle = 'white'
   }






   class Effect {
      constructor(canvas, input) {
         this.canvas = canvas;
         this.width = this.canvas.width;
         this.height = this.canvas.height;
         this.entities = []
         this.player = new usePlayer(this, canvas, input)

         this.createEntities()

         window.addEventListener('resize', e => {
            this.width = this.canvas.width = e.target.window.innerWidth
            this.height = this.canvas.height = e.target.window.innerHeight
            contextSetter()
            // this.particles.forEach(particle => particle.reset())
         })
      }
      createEntities() {
         for (let i = 0; i < 50; i++) {
            const particle = new useParticle(this, canvas)
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
         let playerCollision = false; //=> each loop this resets to false, when we detect collisions we make it true, it will return false and be checked
         for (let a = 0; a < this.entities.length; a++) {
            const
               e1 = this.entities[a],
               e2 = this.player,
               dx = e2.x - e1.x,
               dy = e2.y - e1.y,
               distance = Math.hypot(dx, dy),
               distanceRadius = e2.radius + e1.radius

            const collision = distance <= distanceRadius

            this.entities[a].colliding = collision

            if (collision) {
               playerCollision = true;
               const angle = Math.atan2(dy, dx);
               this.player.collisionAngle = angle
               this.entities[a].collisionAngle = angle
               //=>> Calculate push direction for each entity
               const pushX = Math.cos(angle);
               const pushY = Math.sin(angle);

               this.entities[a].pushX -= pushX;
               this.entities[a].pushY -= pushY;
               this.entities[a].x -= pushX * e1.collisionForce;
               this.entities[a].y -= pushY * e1.collisionForce;

            }
         }

         this.player.colliding = playerCollision;
      }
   }


   const input = new useInputs()
   const effect = new Effect(canvas, input)

   contextSetter()

   const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      effect.handlePlayers(context)
      effect.detectCollisions()
      useStatusText(context, JSON.stringify(input.pressedKeys), {
         x: 50,
         y: 100
      }, '50', canvas)
      //
      requestAnimationFrame(animate)
   }

   animate()
}

