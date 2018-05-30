import $ from 'jquery'
import Game from './game.js'
import Player from "./player.js";
let player = new Player();
import Company from "./company.js";
let company = new Company();

let game = new Game(player, company);
// Старт игры
	game.init();



import '../stylus/styles.styl';
