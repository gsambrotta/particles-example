export const CREATE_PARTICLES = 'CREATE_PARTICLES';

export function createParticles(N, x, y) {
	return {
		type: CREATE_PARTICLES,
		x: x,
		y: y,
		N: N
	};
}


// Other actions
// tickTime
// tickerStarted
// startParticles
// stopParticles
// updateMousePos
