import $ from 'jquery';
import Player from './player';
let players = [];
class Game {
	constructor(player, company) {
		this.player = player;
		this.company = company;
	}

	sendChat(message, type) {
		$('.chat').append('<p class="' + type + '">'+ message + '</p>');
	}

	getPLayers(e) {
		let qInput = $('.names input').length;
		let qSelect = e.target.value;
		
		if (qInput !== qSelect) {
				$('.names').empty();
				for(var i = 0; i<qSelect; i++) {
						var number = i+1;
						$('.names').append('<label for="player-' + number + '">Игрок ' + number + ' </label><input type="text" id="player-'+ number + '"><br>')
				}
		}
	}

	getPlayersNames() {
		// Проверяем все ли поля заполнены
		$('.names input').each(function() {
			if (!this.value) {
					$(this).addClass('error');
			} else {
					$(this).removeClass('error');
			}
		});
		let inputs = $('.names input')
		if (!$('.names input.error').length) {
			for(let i = 0; i<inputs.length; i++) {
				let name = inputs[i].value;
				players[i] = new Player(name);
				setUsers(i, 'name', settings.players[i].name);
				setUsers(i, 'money', settings.players[i].money);
			}
		}
	}

	setUsers(idUser, type, value) {
		var id = idUser + 1;
		var user = '.users .user' + id + ' p.' + type;
		var newUser = '.users .user' + id;
		if (type==="money") {
				value = '$' + value;
		}
		if ($(user).length) {
				$(user).empty().html(value)
		} else {
				$(newUser).append('<p class="' + type + '">' + value + '</p>')
				$(newUser).removeClass('no-active')
		}
	}

	init() {
		$('#start-game').on('click', () => {
			this.getPlayersNames();
		});
		$('#quantity-players').on('change', (e) => {
			this.getPLayers(e);
		});
	}

}

export default Game;