import $ from 'jquery'
class Player {
	constructor(name, block, money=1000000, counter=0) {
		this.name = name;
		this.money = money;
		this.counter = counter;
		this.block = block;
	}

	getName() {
		return this.name;
	}

	setMoney(money) {
		this.money = money;
	}

	getMoney() {
		return this.money;
	}

	setCounter(counter) {
		this.counter = counter;
	}

	getCounter() {
		let random = this.getRandomNumber();
		let sumPoints = random + this.counter;
		if (sumPoints>35) {
			this.counter = sumPoints - 36;
			//Проход круга +200000$
			let updateMoney = this.money += 200000;
			this.setMoney(updateMoney);
		} else {
			this.counter = sumPoints;
		}
		return this.counter;
	}

	getRandomNumber() {
        var number1 = 1 - 0.5 + Math.random() * (6 - 1 + 1);
        var number2 = 1 - 0.5 + Math.random() * (6 - 1 + 1);
        number1 = Math.round(number1);
        number2 = Math.round(number2);
        var random = {number1: number1, number2: number2};
        return random
	}
	
	// Изменяет информацию и игроках в левом меню
	setUsers(type, value) {
		if (type==="money") {
			value = '$' + value;
		}
		if (this.block.length) {
			$(this.block).empty().html(value)
		} else {
			$(newUser).append('<p class="' + type + '">' + value + '</p>')
			$(newUser).removeClass('no-active')
		}
	}

}
export default Player;