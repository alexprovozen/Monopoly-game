import $ from 'jquery';
import Player from './player';
let players = [];
class Game {
	constructor(player, company) {
		this.player = player;
		this.company = company;
	}
	// Выводит сообщение в чат
	sendChat(message, type) {
		$('.chat').append('<p class="' + type + '">'+ message + '</p>');
	}
	// Добавляет новый инпут для нового игрока
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
	// Получает имена игроков и создает экземпляры класса
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
			$('.start-message').fadeOut(200);
			for(let i = 0; i<inputs.length; i++) {
				let name = inputs[i].value;
				players[i] = new Player(name);
				//Выводим информацию о игроках
				players[i].setUsers(i, 'name', players[i].getName());
				players[i].setUsers(i, 'money', players[i].getMoney());
				//Отображаем фишки игроков
				let number = i+1;
                let check = '.checks .user' + number;
                $(check).show();
			}
		}
	}

	// Инициализация игры
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