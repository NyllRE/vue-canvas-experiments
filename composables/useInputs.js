export default class Input {
   constructor() {
      this.lastKey = ""
      window.addEventListener('keydown', (e) => {
         this.lastKey = lastKeyValue(e.key, 'push')
         console.log(this.lastKey);
      }
      )
      window.addEventListener('keyup', (e) => {
         this.lastKey = lastKeyValue(e.key, 'release')
         console.log(this.lastKey);
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