export default class Input {
   constructor() {
      this.lastKey = ""
      this.pressedKeys = []
      window.addEventListener('keydown', (e) => {
         this.lastKey = lastKeyValue(e.key, 'push')

         if (this.pressedKeys.includes('push left') && this.lastKey.includes('right')) {
            this.pressedKeys.splice(this.pressedKeys.indexOf('push left'))
         } else if (this.pressedKeys.includes('push right') && this.lastKey.includes('left')) {
            this.pressedKeys.splice(this.pressedKeys.indexOf('push right'))
         } else if (this.pressedKeys.includes('push up') && this.lastKey.includes('down')) {
            this.pressedKeys.splice(this.pressedKeys.indexOf('push up'))
         } else if (this.pressedKeys.includes('push down') && this.lastKey.includes('up')) {
            this.pressedKeys.splice(this.pressedKeys.indexOf('push down'))
         }

         if (!this.pressedKeys.includes(this.lastKey)) {
            this.pressedKeys.push(this.lastKey)
         }
      }
      )
      window.addEventListener('keyup', (e) => {
         this.lastKey = lastKeyValue(e.key, 'release')
         this.pressedKeys.splice(this.pressedKeys.indexOf(this.lastKey))
      })
   }
}

const lastKeyValue = (key, release) => {
   switch (key) {
      case "w":
      case "ArrowUp":
         return `${release} up`;

      case "a":
      case "ArrowLeft":
         return `${release} left`;

      case "s":
      case "ArrowDown":
         return `${release} down`;

      case "d":
      case "ArrowRight":
         return `${release} right`;
      default:
         return key
   }
}