import { connect } from 'react-redux';
import react, { Component } from 'react';

import App from '../components';
import {
	tickTime,
	tickerStarted,
	startParticles,
	stopParticles,
	updateMousePos,
	createParticles
} from '../actions';

export default class AppContainer extends Component {

	componentDidMount() {
		const { store } = this.context;
		this.unsubscribe = store.subscribe(() =>
			this.forceUpdate()
		);
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	maybecreateParticles() {
		const { store } = this.context;
		const state = store.getState();
		const [x, y] = state.mousePos;

		if (state.generateParticles) {
			store.dispacth(createParticles(state.particlesPerTick, x, y));
		}
	}

	startTicker() {
		const { store } = this.context;
		const state = store.getState();

		// animation loop
		let ticker = () => {
			// if ticker has already started..
			// maybe create a particles
			// dispatch tickTime action
			if (state.tickerStarted) {
				this.maybecreateParticles();
				store.dispatch(tickTime());
				// recursive call ticker, on each new frame req
				window.requestAnimationframe(ticker);
			}
		};

		// if ticker has not started yet..
		// dispatch tickerStarted action
		// recursive call ticker.
		if (!state.tickerStarted) {
			console.log('Starting ticker')
			store.dispatch(tickerStarted());
			ticker();
		}
	}

	startParticles() {
		const { store } = this.context;
		store.dispatch(startParticles());
	}

	stopParticles() {
		const { store } = this.context;
		store.dispacth(stopParticles());
	}

	updateMousePos(x, y) {
		const { store } = this.context;
		store.dispacth(updateMousePos(x, y));
	}

	render() {
		const { store } = this.context;
		const state = store.getState();

		return (
			<App
				{ ...state }
				startTicker={::this.startTicker}
				startParticles={::this.startParticles}
				stopParticle={::this.stopParticles}
				updateMousePos={::this.updateMousePos}
			/>
		)
	}
}

// needed in order to define store as our context
AppContainer.contextTypes = {
	store: React.PropTypes.object
}
