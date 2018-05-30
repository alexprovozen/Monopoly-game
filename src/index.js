import $ from 'jquery'
var qSelect;
$(function() {

	var settings = {
		players: []
	};

	// Выводит информацию в чат
	function sendChat(message, type) {
		$('.chat').append('<p class="' + type + '">'+ message + '</p>');
	}

	//Обновляет информацию в окне users
	function setUsers(idUser, type, value) {
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

	//Возвращает два случайных числа
	function randomNumber() {
		var number1 = 1 - 0.5 + Math.random() * (6 - 1 + 1);
		var number2 = 1 - 0.5 + Math.random() * (6 - 1 + 1);
		number1 = Math.round(number1);
		number2 = Math.round(number2);
		var random = {number1: number1, number2: number2};
		return random
	}
	//Определяет порядок игроков
	function setOrder() {
		//генерируем случайние числа
		for (var i = 0; i < settings.players.length; i++) {
			var random = randomNumber();
			settings.players[i].randomSum = random.number1 + random.number2;
			sendChat('Игрок <b>' + settings.players[i].name + '</b> выбрасывает ' + random.number1 + ' и ' + random.number2, 'info');
			//проверяем наличие повторений
			if (i > 0) {
				for(var k = 0; k<i; k++) {
					if (settings.players[i].randomSum === settings.players[k].randomSum) {
							var random = randomNumber();
							settings.players[i].randomSum = random.number1 + random.number2;
							sendChat('Игрок <b>' + settings.players[i].name + '</b> перебрасывает ' + random.number1 + ' и ' + random.number2, 'info');
					}
				}
			}
		}
		//сортируем массив
		function compareRandom(personA, personB) {
				return personB.randomSum - personA.randomSum;
		}
		settings.players.sort(compareRandom);
		for(var i = 0; i < settings.players.length; i++) {
				var order = ['Первым', 'Вторым', 'Третьим', 'Четвертым', 'Пятым'];
				sendChat(order[i] + ' ходит <b>' + settings.players[i].name + '</b>', 'trade');
		}
	}


	//Таймер
	function timer(seconds) {
		var $blockTimer = $('.monitor .timeOut');
		$blockTimer.show();
		var time = setInterval(function () {
				seconds--;
				$blockTimer.empty().html(seconds);
				if (seconds === 0) {
					clearInterval(time);
				}
		}, 1000)
	}

	// Запускает игру
	function startGame() {
		// Проверяем все ли поля заполнены
		$('.names input').each(function() {
			if (!this.value) {
					$(this).addClass('error');
			} else {
					$(this).removeClass('error');
			}
		});
		// Если ошибок нет продолжаем
		if (!$('.names input.error').length) {
			$('.names input').each(function() {
					var id = $(this).attr('id');
					var i = +id.replace(/\D+/g,"") - 1;
					settings.players[i] = {
							id: id,
							name: this.value,
							money: 1000000,
							counter: 0
					}
			});
			$('.start-message').fadeOut(200);
			for (var i = 0; i<settings.players.length; i++) {
					setUsers(i, 'name', settings.players[i].name);
					setUsers(i, 'money', settings.players[i].money);
					//показываем фишки игроков
					var number = i+1;
					var check = '.checks .user' + number;
					$(check).show();
			}
			sendChat('Игра началась', 'info');
			sendChat('Определяем очередь игроков', 'info');

			//определяем очередь игроков
			setOrder();
			playerProgress();
		}

	}

//ход игрока
function playerProgress() {
	var duration = 0;
	for (var i = 0; i<settings.players.length; i++) {
		var that = i;
		(function(){
			var thiss = that;
			var timer2 = setTimeout(function() {
				timer(10);
				sendChat('Ход игрока <b>' + settings.players[thiss].name + '</b>', 'info');
			}, duration);
		})();
		duration += 10000
	}
}



// Кнопка запуска игры
$('#start-game').on('click', startGame)

// Добавление новых играков
$('#quantity-players').on('change', function() {
		var qInput = $('.names input').length;
		qSelect = this.value;
		if (qInput !== qSelect) {
				$('.names').empty();
				for(var i = 0; i<qSelect; i++) {
						var number = i+1;
						$('.names').append('<label for="player-' + number + '">Игрок ' + number + ' </label><input type="text" id="player-'+ number + '"><br>')
				}
		}
})

});

import './stylus/styles.styl';
