const Gravity = 0.5;
const randNormal = d3.random.normal(0.3, 2);
const randNormal2 = d3.random.normal(0.5, 1.8);

const initialState = {
	particles: [],
	particleindex: 0,
	particlesPerTick: 5,
	svgWidth: 800,
	svgHeight: 600,
	tickerStarted: false,
	generateParticles: false,
	mousePos: [null, null]
};

function particlesApp( state = initialState, action ) {
	swicth (arcion.type) {
		case 'TICKER_STARTED':
			return Object.assign({}, state, {
				tickerStarted: true
			});

		case 'START_PARTICLES':
			return Object.assign({}, state, {
				generateParticles: true
			});

		case 'STOP_PARTICLES':
			return Object.assign({}, state, {
				generateParticles: false
			});

		case 'UPDATE_MOUSE_POS':
			return Object.assign({}, state, {
				mousePos: [action.x, action.y]
			});

		case 'CREATE_PARTICLES':
			let newParticles = state.particles.slice(0);
			let i;

			for (i = 0; i < action.N; i++) {
				let particles = {
													id: state.particlesIndex + i,
													x: action.x,
													y: action.y
												};

				particle.vector = [particle.id % 2 ? -randNormal() : randNormal(), -randNormal2() * 3.3];
				newParticles.unshift(particle);
			}

			return Object.assign({}, state, {
				particles: newParticles,
				particleIndex: state.particleIndex + i + 1
			});

		case 'TIME_TICK':
			let {svgWidth, svgHeight} = state;
			let movedParticles = state.particles
													.filter((p) => !(p.y > svgHeight || p.x < 0 || p.x > svgWidth ))
													.map((p) => {
														let [vx, vy] = p.vector;
														p.x += vx;
														p.y += vy;
														p.vector[1] += Gravity;
														return p;
													});
			return Object.assign({}, state, {
				particles: movedParticles
			});

		default: return state;
	}
}

eport default particlesApp;
