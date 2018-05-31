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
				for(let i = 0; i<qSelect; i++) {
						let number = i+1;
						$('.names').append('<label for="player-' + number + '">Игрок ' + number + ' </label><input type="text" id="player-'+ number + '"><br>')
				}
		}
	}
	// Получает имена игроков и создает экземпляры класса
	initPlayers() {
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
			let block = document.querySelectorAll('.users li');
			for(let i = 0; i<inputs.length; i++) {
				let name = inputs[i].value;
				players[i] = new Player(name, block[i]);
				//Выводим информацию о игроках
				players[i].setUsers('name', players[i].getName());
				players[i].setUsers('money', players[i].getMoney());
				//Отображаем фишки игроков
				let number = i+1;
                let check = '.checks .user' + number;
                $(check).show();
			}
			this.sendChat('Игра началась', 'info');
			this.sendChat('Определяем очередь игроков', 'info');
			this.setOrder();
			this.startGame(0);
		}
	}

	//Определяет порядок игроков
	setOrder() {
		//генерируем случайние числа
		for (let i = 0; i < players.length; i++) {
			let random = players[i].getRandomNumber();
			players[i].randomSum = random.number1 + random.number2;
			this.sendChat('Игрок <b>' + players[i].name + '</b> выбрасывает ' + random.number1 + ' и ' + random.number2, 'info');
			//проверяем наличие повторений
			if (i > 0) {
				for(let k = 0; k<i; k++) {
					if (players[i].randomSum === players[k].randomSum) {
						let random = players[i].getRandomNumber();
						players[i].randomSum = random.number1 + random.number2;
						this.sendChat('Игрок <b>' + players[i].name + '</b> перебрасывает ' + random.number1 + ' и ' + random.number2, 'info');
					}
				}
			}
		}
		//сортируем массив
		function compareRandom(personA, personB) {
			return personB.randomSum - personA.randomSum;
		}
		players.sort(compareRandom);
		for(let i = 0; i < players.length; i++) {
			delete players[i].randomSum;
			let order = ['Первым', 'Вторым', 'Третьим', 'Четвертым', 'Пятым'];
			this.sendChat(order[i] + ' ходит <b>' + players[i].name + '</b>', 'trade');
		}
	}

	timer(seconds) {
		let $blockTimer = $('.playerProgress .timeOut');
		$blockTimer.show();
		let time = setInterval(function () {
            seconds--;
            $blockTimer.empty().html(seconds);
            if (seconds === 0) {
                clearInterval(time);
            }
		}, 1000)
	}

	startGame(player) {
		this.sendChat('Ход игрока <b>' + players[player].name + '</b>', 'info');
		this.timer(20);
		players[player].playerProgress();
		let next = player + 1;
		setTimeout( () => {
			if (next === players.length) {
				next = 0;
			}
			this.startGame(next)
		},20000)
	}

	// Инициализация игры
	init() {
		$('#start-game').on('click', () => {
			this.initPlayers();
		});
		$('#quantity-players').on('change', (e) => {
			this.getPLayers(e);
		});

		
	}

}

export default Game;