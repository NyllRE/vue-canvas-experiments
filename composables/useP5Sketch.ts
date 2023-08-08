/** @format */


class Particle {
	pos: any;
	vel: any;
	acc: any;
	maxspeed: number;
	prevPos: any;
	p5: any;
	scl: number;
	cols: number;
	width: number;
	height: number;
	constructor(
		p: any,
		width: number,
		height: number,
		scl: number,
		cols: number
	) {
		this.pos = p.createVector(p.random(width), p.random(height));
		this.vel = p.createVector(0, 0);
		this.acc = p.createVector(0, 0);
		this.maxspeed = 6;
		this.prevPos = this.pos.copy();
		this.p5 = p;
		this.scl = scl;
		this.cols = cols;
		this.width = width;
		this.height = height;
	}

	update(this: any) {
		this.vel.add(this.acc);
		this.vel.limit(this.maxspeed);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	follow(vectors: any) {
		const x = this.p5.floor(this.pos.x / this.scl);
		const y = this.p5.floor(this.pos.y / this.scl);
		const index = x + y * this.cols;
		const force = vectors[index];
		this.applyForce(force);
		// console.log(cols);
	}

	applyForce(force: any) {
		this.acc.add(force);
	}

	show(this: any) {
		// this.p5.stroke(255, this.opacityFix());
		this.p5.stroke(255, 255, 255, 10);
		this.p5.strokeWeight(1);
		this.p5.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
		this.updatePrev();
	}

	updatePrev(this: any) {
		this.prevPos.x = this.pos.x;
		this.prevPos.y = this.pos.y;
	}

	edges(this: any) {
		if (this.pos.x > this.width) {
			this.pos.x = 0;
			this.updatePrev();
		}
		if (this.pos.x < 0) {
			this.pos.x = this.width;
			this.updatePrev();
		}
		if (this.pos.y > this.height) {
			this.pos.y = 0;
			this.updatePrev();
		}
		if (this.pos.y < 0) {
			this.pos.y = this.height;
			this.updatePrev();
		}
	}
}

export default (p: any, width: number, height: number) => {
	// Daniel Shiffman
	// https://thecodingtrain.com/CodingChallenges/024-perlinnoiseflowfield.html

	const inc = 0.1;
	const scl = 10;
	let cols = 0,
		rows = 0;

	let zoff = 0;

	let fr;

	const particles: any = [];

	let flowfield: Array<number>;

	function setup() {
		const canvas = p.createCanvas(width, height - 3);
		canvas.parent('p5canvas');

		cols = p.floor(width / scl);
		rows = p.floor(height / scl);
		// fr = p.createP('');

		flowfield = new Array(cols * rows);

		for (let i = 0; i < 300; i++) {
			particles[i] = new Particle(p, width, height, scl, cols);
		}
		p.background(0);
	}

	function draw() {
		let yoff = 0;
		for (let y = 0; y < rows; y++) {
			let xoff = 0;
			for (let x = 0; x < cols; x++) {
				const index = x + y * cols;
				const angle = p.noise(xoff, yoff, zoff) * Math.PI * 2 * 2;
				// console.log(angle, Math.cos(x), Math.sin(y));

				const v = p.createVector(p.cos(angle), p.sin(angle));
				v.setMag(1);
				flowfield[index] = v;
				xoff += inc;
				p.stroke(0, 50);
			}
			yoff += inc;

			zoff += 0.0003;
		}

		// console.log(flowfield);

		for (const particle of particles) {
			particle.follow(flowfield);
			particle.update();
			particle.edges();
			particle.show();
		}

		// fr.html(floor(frameRate()));
	}

	return { draw, setup, Particle };
};
