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

	playerRun() {
		let random = this.getRandomNumber();
		let sumPoints = random + this.counter;
		if (sumPoints>35) {
			this.counter = sumPoints - 36;
			//Проход круга +200000$
			this.setMoney(this.money += 200000);
			this.setUsers('money', this.getMoney());
		} else {
			this.counter = sumPoints;
		}
		return this.counter;
	}

	getRandomNumber() {
        let number1 = 1 - 0.5 + Math.random() * (6 - 1 + 1);
        let number2 = 1 - 0.5 + Math.random() * (6 - 1 + 1);
        number1 = Math.round(number1);
        number2 = Math.round(number2);
        let random = {number1: number1, number2: number2};
        return random;
	}
	
	// Изменяет информацию и игроках в левом меню
	setUsers(type, value) {
		if (type==="money") {
			value = '$' + value;
		}
		let p = '<p class="' + type + '">' + value + '</p>';
		let path = 'p.' + type;
		if ($(this.block).children(path).length) {
			$(this.block).children(path).empty().append(p)
		} else {
			$(this.block).append(p)
			$(this.block).removeClass('no-active');
		}
	}

	playerProgress() {
		let that = this;
		$('.playerProgress .run').show().on('click', () => {
			console.log(that.playerRun())
		});


	}

}
export default Player;