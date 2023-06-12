export default class Input {
   constructor() {
      this.pressedKeys = [];

      window.addEventListener('keydown', (e) => {
         const key = getKeyName(e.key);
         if (!this.pressedKeys.includes(key)) {
            this.pressedKeys.push(key);
         }
      });

      window.addEventListener('keyup', (e) => {
         const key = getKeyName(e.key);
         const index = this.pressedKeys.indexOf(key);
         if (index > -1) {
            this.pressedKeys.splice(index, 1);
         }
      });
   }
}

const getKeyName = (key) => {
   switch (key) {
      case "w":
      case "ArrowUp":
         return "up";

      case "a":
      case "ArrowLeft":
         return "left";

      case "s":
      case "ArrowDown":
         return "down";

      case "d":
      case "ArrowRight":
         return "right";

      default:
         return key;
   }
}
