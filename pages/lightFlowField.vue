<!-- @format -->

<script setup lang="ts">
const { $p5, $dat } = useNuxtApp(); //? Access p5 in the component or page using $ function

onMounted(async () => {
	const p5instance = new $p5((p) => {
		interface coords {
			x: number;
			y: number;
		}
      let particles: coords[] = []
      
      const settings = reactive({
			particleCount: 2000,
			noiseScale: 0.01,
         speed: 2.5
      })
      // Creating a GUI with options.
      var gui = new $dat.GUI({ name: 'My GUI' });
      gui.add(settings, 'noiseScale', 0, .1);
      gui.add(settings, 'speed', 0, 10);

		p.setup = () => {
			p.createCanvas(window.innerWidth, window.innerHeight).parent('p5canvas');
			for (let i = 0; i < settings.particleCount; i++) {
				particles.push(p.createVector(p.random(p.width), p.random(p.height)));
			}
			p.stroke(255, 50);
			p.strokeWeight(2);
			p.background(255);
		};
		p.draw = () => {
			p.background(10, 10);
			for (let particle of particles) {
            p.point(particle.x, particle.y); //=> placing points

				if (p.mouseIsPressed && p.mouseButton === p.LEFT) disparse(particle);
            else followNoise(particle);

				if (!onScreen(particle)) {
					particle.x = p.random(p.width);
					particle.y = p.random(p.height);
				}
			}
		};

		p.mouseReleased = () => {
			p.noiseSeed(p.millis());
		};

		const disparse = (particle: coords) => {
			const angle = calculateAngle(particle.x, particle.y, p.mouseX, p.mouseY);
			particle.x += p.sin(angle) * settings.speed;
			particle.y += p.cos(angle) * settings.speed;
		};

		const followNoise = (particle: coords) => {
			const noise = p.noise(particle.x * settings.noiseScale, particle.y * settings.noiseScale);
			const angle = p.TAU * noise;
			particle.x -= p.cos(angle) * settings.speed;
			particle.y -= p.sin(angle) * settings.speed;
		};

		const calculateAngle = (
			x1: number,
			y1: number,
			x2: number,
			y2: number
		): number => {
			const dx: number = x2 - x1;
			const dy: number = y2 - y1;
			const angle: number = (Math.atan2(dy, dx) * 180) / Math.PI;
			return angle;
		};

		const onScreen = (particle: coords) => {
			return (
				particle.x >= 0 &&
				particle.x <= p.width &&
				particle.y >= 0 &&
				particle.y <= p.height
			);
		};
	});
});

</script>

<template lang="pug">
.canvas
   #p5canvas


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
   overflow: hidden
   top: 0
   left: 0
</style>
