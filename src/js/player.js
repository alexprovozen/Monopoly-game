import $ from 'jquery'
class Player {
	constructor(name ,money=1000000, counter=0) {
		this.name = name;
		this.money = money;
		this.counter = counter;
		this.points = 0;
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
		return this.counter;
	}
	

}
export default Player;