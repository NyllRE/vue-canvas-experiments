import * as dat from 'dat.gui';

export default defineNuxtPlugin(() => {
	return {
		provide: {
			dat,
		},
	};
});
