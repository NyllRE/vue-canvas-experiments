export default (ctx, input, pos) => {
   ctx.font = "50px Helvetica, Arial, sans-serif"
   ctx.fillText(`Last input: ${input.lastKey}`, pos.x, pos.y)
}