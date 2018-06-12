import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		cells: [
			{
				type: 'otherCell',
				name: 'Start'
			},
			{
				type: 'company',
				name: 'Rolls Royce',
				country: 'UK',
				src: '',
				countrySrc: '',
				description: '',
				cost: '120000',
				owner: '',
			},
			{
				type: 'company',
				name: 'McDonald\'s',
				country: 'USA',
				src: '',
				countrySrc: '',
				description: '',
				cost: '150000',
				owner: '',
			},
			{
				type: 'company',
				name: 'Vodafone',
				country: 'UK',
				src: '',
				countrySrc: '',
				description: '',
				cost: '100000',
				owner: '',
			},
			{
				type: 'company',
				name: 'Shazam',
				country: 'UK',
				src: '',
				countrySrc: '',
				description: '',
				cost: '120000',
				owner: '',
			},
			{
				type: 'minusMoney',
				name: 'Форс мажор',
				src: '',
				description: '',
			},
			{
				type: 'company',
				name: 'Samsung',
				country: 'Korea',
				src: '',
				countrySrc: '',
				description: '',
				cost: '140000',
				owner: '',
			},
			{
				type: 'changeMoney',
				name: 'Шанс',
				src: '',
				description: '',
			},
			{
				type: 'company',
				name: 'Danone',
				country: 'France',
				src: '',
				countrySrc: '',
				description: '',
				cost: '160000',
				owner: '',
			},
			{
				type: 'company',
				name: 'Hennessy',
				country: 'France',
				src: '',
				countrySrc: '',
				description: '',
				cost: '155000',
				owner: '',
			},
			{
				type: 'company',
				name: 'Disney',
				country: 'USA',
				src: '',
				countrySrc: '',
				description: '',
				cost: '150000',
				owner: '',
			},
			{
				type: 'company',
				name: 'Renault',
				country: 'France',
				src: '',
				countrySrc: '',
				description: '',
				cost: '125000',
				owner: '',
			}
		]
	}, 
	getters: {
		cells (state) {
			return state.cells
		}
	}
})