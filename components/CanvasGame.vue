<!-- @format -->

<script setup>
onMounted(() => {
	const canvas = document.getElementById('canvas1');
	const ctx = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;


   
	useCanvas(canvas, ctx);
	console.log(ctx);
});
</script>

<template>
	<canvas id="canvas1"></canvas>
</template>
  
<style lang="sass">

canvas
   background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url("https://cdn.mos.cms.futurecdn.net/4MLyNZ66GSMUp7z49Q8k3K.jpg")
   background-size: cover
   background-position: center center
   position: absolute
   top: 0
   left: 0
</style>
