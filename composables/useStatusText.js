export default (ctx, value, pos, size, canvas) => {
   ctx.font = `${size}px Helvetica, Arial, sans-serif`
   ctx.fillText(`Last input: ${value}`, pos.x, pos.y)
}