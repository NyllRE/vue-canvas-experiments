<!-- @format -->

<script setup>
onMounted(() => {
	const canvas = document.getElementById('canvas1');
	const ctx = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx.fillStyle = '#FFFFFF';
	useCanvas(canvas, ctx);
	console.log(ctx);
});
</script>

<template>
	<canvas id="canvas1"></canvas>
</template>

<style lang="sass">

canvas
   background: black
   position: absolute
   top: 0
   left: 0
</style>
