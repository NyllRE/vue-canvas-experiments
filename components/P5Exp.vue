<!-- @format -->

<script setup lang="ts">
const { $p5 } = useNuxtApp(); //Access p5 in the component or page using $ function

onMounted(async () => {
	const p5instance = new $p5((p) => {

      const {setup, draw} = useP5Sketch(p, window.innerWidth, window.innerHeight)
      p.setup = setup
      p.draw = draw
   });
});
</script>

<template>
	<div id="p5canvas"></div>
</template>

<style lang="sass">

#p5canvas
   // background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhdqwalls.com%2Fdownload%2Fipad-pro-new-li-2560x1440.jpg&f=1&nofb=1&ipt=f8b20a0b90207d62668a5ac77d9c9bd197c38d1fc7fec3e39a7db8e52e85f295&ipo=images")
   // background: #0009
   background-size: cover
   background-repeat: no-repeat
   background-position: center center
   position: absolute
   max-width: 100dvw
   max-height: 100dvh
   top: 0
   left: 0
</style>
