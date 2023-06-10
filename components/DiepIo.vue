<!-- @format -->

<script setup>
onMounted(() => {
	const canvas = document.getElementById('diep');
	const ctx = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	useDiep(canvas, ctx);
});
</script>

<template lang="pug">

canvas#diep

</template>
  
<style lang="sass">

canvas
   background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhdqwalls.com%2Fdownload%2Fipad-pro-new-li-2560x1440.jpg&f=1&nofb=1&ipt=f8b20a0b90207d62668a5ac77d9c9bd197c38d1fc7fec3e39a7db8e52e85f295&ipo=images")
   background-size: cover
   background-repeat: no-repeat
   background-position: center center
   position: absolute
   top: 0
   left: 0
   
</style>
