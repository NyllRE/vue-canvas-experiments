/** @format */

import p5 from 'p5';

// export default defineNuxtPlugin((nuxtApp) => {
// 	nuxtApp.provide('p5', p5);
// });

export default defineNuxtPlugin(() => {
	return {
		provide: {
			p5,
		},
	};
});
