<template>
  <v-app>
		<div class="start-message" ref="start">
			<div class="boxx">
				<h1>Добро пожаловать в мир Монополии!</h1>
				<v-alert :value="true" type="info">
					Выберите количество играков и введите их имена.
    		</v-alert>
			<v-select
				:value="count"
				:dense="true"
				:items="options"
				label="Select"
				@change="count = $event"
				id="quantity-players"
				single-line
				max-height="200"
			></v-select>
			<br>
			<div class="names">
				<v-form ref="form" v-model="valid" validation>
					<v-text-field
						v-for="index of count" :key="index"
						class="input"
						:id="'player-' + index"
						:label="'Игрок ' + index"
						:rules="[v => !!v || 'Это поле обязательно']"
					></v-text-field>
					<v-layout mt-3>
						<v-spacer></v-spacer>
						<v-btn color="success" @click="initGame" id="start-game">Начать игру</v-btn>
					</v-layout>
				</v-form>
			</div>
			</div>
		</div>
		<div class="wrapper">
		<div class="game-place">
            <div class="checks">
              <div :style="{display: 'block'}"
									v-for="(n, index) of players" 
									:key="index" 
									:class="'check user' + (index+1)"
									>
							</div>
            </div>
			<div class="top">
				<ul>
					<li class="item square">
						<div>
							<div>
								Старт 0
							</div>
						</div>
					</li>
					<li class="item">1</li>
					<li class="item">2</li>
					<li class="item">3</li>
					<li class="item">4</li>
					<li class="item">5</li>
					<li class="item">6</li>
					<li class="item">7</li>
					<li class="item">8</li>
					<li class="item">9</li>
					<li class="item">10</li>
					<li class="item">11</li>
					<li class="item square">
						<div>
							<div>
								Тюрьма 12
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="middle">
				<ul class="container">
					<li class="left">
						<ul>
							<li class="item">35</li>
							<li class="item">34</li>
							<li class="item center">33</li>
							<li class="item">32</li>
							<li class="item">31</li>
						</ul>
					</li>
					<li class="center">
						<div class="monitor">
							<div class="playerProgress">
								<div class="timeOut" ref="timer">
									20
								</div>
								<v-btn color="success" class="run" 
												@click="playerProgress"
												ref="run"
												>Бросить кубики</v-btn>
								<v-btn color="warning" 
												class="buy"
												ref="buy"
												>Купить</v-btn>
								<button class="next">Следующий</button>
							</div>
						</div>
						<div class="chat" ref="chat"></div>
					</li>
					<li class="right">
						<ul>
							<li class="item">13</li>
							<li class="item">14</li>
							<li class="item center">15</li>
							<li class="item">16</li>
							<li class="item">17</li>
						</ul>
						</li>
				</ul>
			</div>
			<div class="bottom">
				<ul>
					<li class="item square">
						<div>
							<div>
								Инспекция 30
							</div>
						</div>
					</li>
					<li class="item">29</li>
					<li class="item">28</li>
					<li class="item">27</li>
					<li class="item">26</li>
					<li class="item">25</li>
					<li class="item">24</li>
					<li class="item">23</li>
					<li class="item">22</li>
					<li class="item">21</li>
					<li class="item">20</li>
					<li class="item">19</li>
					<li class="item square">
						<div>
							<div>
								Рулетка 18
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="users" ref="users">
			<ul>
				<li :class="'user' + (index + 1)" v-for="(player, index) of players" :key="index">
					<p class="name">{{ player.name }}</p>
					<p class="money">${{ player.money }}</p>
				</li>
			</ul>
		</div>
	</div>
	</v-app>
</template>

<script>
//import AppPlayers from './assets/Players'
let interval = 0
let timeOut = 0
export default {
  data () {
    return {
			count: 2,
			players: [],
			player: 0,
			options: [2,3,4,5],
			valid: true
    }
	},
	methods: {
		initGame() {
			let error = false;
			let inputs = document.querySelectorAll('.names input');
			for (let input of inputs) {
				let player = {
					name: input.value,
					money: 1000000,
					counter: 0,
				}
				this.players.push(player);
			}
			this.$refs.start.style.display = 'none';
			this.sendChat('Игра началась', 'infos');
			this.sendChat('Определяем очередь игроков', 'infos');
			this.setOrder();
			this.startGame(this.player, true);
		},

		sendChat(message, type) {
			let p = document.createElement('p');
			p.className = type;
			p.innerHTML = message;
			let chat = this.$refs.chat;
			chat.appendChild(p);
			chat.scrollTop = chat.scrollHeight;
		},

		getRandomNumbers() {
			let number1 = Math.round(1 - 0.5 + Math.random() * (6 - 1 + 1));
			let number2 = Math.round(1 - 0.5 + Math.random() * (6 - 1 + 1));
			return [number1, number2]
		},

		setOrder() {
		//генерируем случайние числа
			for (let i=0; i<this.players.length;i++) {
				let random = this.getRandomNumbers();
				this.players[i].randomSum = random[0] + random[1];
				this.sendChat(`Игрок <b>${this.players[i].name}</b> выбрасывает ${random[0]} и ${random[1]}`, 'infos');
				//проверяем наличие повторений
				if (i > 0) {
					for(let k = 0; k<i; k++) {
						if (this.players[i].randomSum === this.players[k].randomSum) {
              let random = this.getRandomNumbers();
              this.players[i].randomSum = random[0] + random[1];
							while (this.players[i].randomSum === this.players[k].randomSum) {
                random = this.getRandomNumbers();
                this.players[i].randomSum = random[0] + random[1];
							}
							this.sendChat(`Игрок <b>${this.players[i].name}</b> перебрасывает ${random[0]} и ${random[1]}`, 'infos');
						}
					}
				}
			}
			//сортируем массив
			function compareRandom(personA, personB) {
				return personB.randomSum - personA.randomSum;
			}
			this.players.sort(compareRandom);
			for(let i = 0; i < this.players.length; i++) {
				delete this.players[i].randomSum;
				let order = ['Первым', 'Вторым', 'Третьим', 'Четвертым', 'Пятым'];
				this.sendChat(`${order[i]} ходит<b> ${this.players[i].name}</b>`, 'trade');
			}
		},

		timer(seconds) {
			let blockTimer = this.$refs.timer;
			blockTimer.style.display = 'block';
			interval = setInterval( () => {
				seconds--;
				blockTimer.innerHTML = seconds;
				if (seconds === 0) {
						clearInterval(interval);
				}
			}, 1000)
		},

		clearTimer() {
			clearInterval(interval);
			clearTimeout(timeOut);
		},

		startGame(player, newPlayer) {
			if (newPlayer) {
				this.$refs.run.$el.style.display = 'block';
				this.sendChat('Ход игрока <b>' + this.players[player].name + '</b>', 'infos');
				this.$refs.buy.$el.style.display = 'none';
			} else {
				this.$refs.buy.$el.style.display = 'block';
				this.sendChat('Купить компанию <b>' + this.players[player].name + '</b>', 'infos');

			}
			this.timer(10);
			let next = player + 1;
			timeOut = setTimeout( () => {
				if (next === this.players.length) {
					next = 0;
				}
				clearInterval(interval)
				this.startGame(next, true)
				this.player++
				if (this.player === this.players.length) {
					this.player = 0;
				}
			},11000)
		},

		playerRun(i) {
		  let player = this.players[i]
			let random = this.getRandomNumbers();
			this.moveCheck(this.player, random[0]+random[1])
			let sumPoints = random[0] + random[1] + player.counter;
      this.sendChat(`Игрок <b>${player.name}</b> выбрасывает ${random[0]} и ${random[1]}`, 'infos');
			if (sumPoints>35) {
        player.counter = sumPoints - 36;
				//Проход круга +200000$
        player.money += 200000;
        this.sendChat(`Игрок <b>${player.name}</b> проходит круг и получает $200 000`, 'infos');
			} else {
        player.counter = sumPoints;
			}
			this.sendChat(`Игрок <b>${player.name}</b> перемещается на клетку ${player.counter}`, 'infos');
			
			this.startGame(this.player, false);
		},

		playerProgress() {
			this.clearTimer();
			this.$refs.run.$el.style.display = 'none';
			this.playerRun(this.player);
		},
		moveCheck(player, points) {
			let checks = document.querySelectorAll('.check')
			let check = checks[player];
			let counter = this.players[player].counter;
			function movesCheck(direction, value) {
				check.style[direction] = (parseFloat(check.style[direction] || getComputedStyle(check)[direction]) + value) + 'px';
				return check.style[direction]
			}
			console.log("------- " + player)
			for (let i=0; i<points; i++) {
				console.log(counter)
				if (counter === 0 || counter === 11) {
					console.log(movesCheck('left', 103.67));
				} else if (counter === 14 || counter === 15) {
					movesCheck('top', 70.07);
				} else if (counter === 12 || counter === 17) {
					movesCheck('top', 103.95);
				} else if (counter === 18 || counter === 29) {
					movesCheck('left', -103.67);
				} else if (counter === 32 || counter === 33) {
					movesCheck('top', -70.07);
				} else if (counter === 30 || counter === 35) {
					movesCheck('top', -103.95);
					if (counter === 35) {
						counter=0;
						continue
					}
				} else if (counter<12) {
					console.log(movesCheck('left', 61.36));
				} else if (counter<18) {
					movesCheck('top', 61.92);
				} else if (counter<30) {
					movesCheck('left', -61.36);
				} else if (counter<36) {
					movesCheck('top', -61.92);
				}
				counter++
			}
		}
	}
}
</script>

<style scoped>
@import './assets/base-css/reset.css';

.wrapper {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  min-height: 100vh;
  margin: 0 auto;
}

.wrapper .game-place {
  height: -webkit-calc(100vh - 30px);
  height: calc(100vh - 30px);
  width: -webkit-calc(100vh * 1.54 - 30px);
  width: calc(100vh * 1.54 - 30px);
  border: 1px solid #000;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  margin: 15px 10px;
  -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
          flex-shrink: 0;
  position: relative;
}

.wrapper .game-place .top ul,
.wrapper .game-place .middle ul,
.wrapper .game-place .bottom ul {
	padding: 0;
  list-style: none;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
      -ms-flex-direction: row;
          flex-direction: row;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
}

.wrapper .game-place .top li,
.wrapper .game-place .middle li,
.wrapper .game-place .bottom li {
  border: 1px solid #808080;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
}

.wrapper .game-place .top li,
.wrapper .game-place .bottom li {
  width: -webkit-calc(70% / 11);
  width: calc(70% / 11);
}

.wrapper .game-place .top li.square,
.wrapper .game-place .bottom li.square {
  width: 15%;
}

.wrapper .game-place .top li.square>div,
.wrapper .game-place .bottom li.square>div {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
}

.wrapper .game-place .top li.square>div>div,
.wrapper .game-place .bottom li.square>div>div {
  width: 100%;
  height: 100%;
  position: absolute;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
}

.wrapper .game-place .middle {
  height: 53%;
}

.wrapper .game-place .middle .container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
      -ms-flex-direction: row;
          flex-direction: row;
  height: 100%;
}

.wrapper .game-place .middle .container .left,
.wrapper .game-place .middle .container .right {
  width: 15%;
  display: block;
  border: none;
}

.wrapper .game-place .middle .container .left>ul,
.wrapper .game-place .middle .container .right>ul {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
      -ms-flex-direction: column;
          flex-direction: column;
  height: 100%;
}

.wrapper .game-place .middle .container .left>ul>li.item,
.wrapper .game-place .middle .container .right>ul>li.item {
  height: 19%;
}

.wrapper .game-place .middle .container .left>ul>li.center,
.wrapper .game-place .middle .container .right>ul>li.center {
  height: 24%;
  width: 100%;
}

.wrapper .game-place .middle .container .center {
  width: 70%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
      -ms-flex-direction: row;
          flex-direction: row;
}

.wrapper .game-place .middle .container .center .monitor {
  width: 70%;
  border-right: 2px solid #808080;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
}

.start-message {
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	z-index: 100;
	background: rgba(0,0,0,0.7);
	padding: 20px;
	display: flex;
}

.boxx {
	width: 50%;
	height: 80%;
	overflow-y: scroll;
	margin: auto;
	background: white;
	padding: 20px;
}

.wrapper .game-place .middle .container .center .monitor i {
  margin: 10px;
  font-size: 12px;
}

.wrapper .game-place .middle .container .center .monitor hr {
  margin: 10px 0;
}

.wrapper .game-place .middle .container .center .monitor .names .input {
  border: 1px solid #000;
  margin: 5px 0;
}

.wrapper .game-place .middle .container .center .monitor .names input.error {
  outline: 1px solid #c40f13;
}

.wrapper .game-place .middle .container .center .monitor .playerProgress .timeOut {
  font-size: 50px;
  display: none;
  text-align: center;
}

.wrapper .game-place .middle .container .center .monitor .playerProgress .run,
.wrapper .game-place .middle .container .center .monitor .playerProgress .buy,
.wrapper .game-place .middle .container .center .monitor .playerProgress .next {
  display: none;
  margin-top: 20px;
}

.wrapper .game-place .middle .container .center .chat {
  width: 30%;
  padding: 5px;
  overflow: auto;
}

.wrapper .game-place .middle .container .center .chat p {
	margin: 0 !important;
}

.wrapper .game-place .middle .container .center .chat p.infos {
  font-size: 12px;
  color: #808080;
}

.wrapper .game-place .middle .container .center .chat p.trade {
  font-size: 12px;
  color: #009688;
}

.wrapper .game-place .middle .container .center .chat p.exit {
  font-size: 12px;
  color: #f00;
}

.wrapper .game-place .checks .check {
  height: 20px;
  width: 20px;
  position: absolute;
  text-align: center;
  display: none;
}

.wrapper .game-place .checks .check.user1 {
  background-color: #ff7575;
  top: 41.33px;
  left: 41.33px;
	z-index: 2;
}

.wrapper .game-place .checks .check.user2 {
  background-color: #7dff7d;
  top: 41.33px;
  left: 81.33px;
	z-index: 2;
}

.wrapper .game-place .checks .check.user3 {
  background-color: #66f;
  top: 61.33px;
  left: 61.33px;
	z-index: 2;
}

.wrapper .game-place .checks .check.user4 {
  background-color: #ffff80;
  top: 81.33px;
  left: 41.33px;
	z-index: 2;
}

.wrapper .game-place .checks .check.user5 {
  background-color: #82ffff;
  top: 81.33px;
  left: 81.33px;
	z-index: 2;
}

.wrapper .users {
  height: -webkit-calc(100vh - 30px);
  height: calc(100vh - 30px);
  width: -webkit-calc(100vh * 0.4 - 30px);
  width: calc(100vh * 0.4 - 30px);
  border: 1px solid #000;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  margin: 15px 10px;
  -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
          flex-shrink: 0;
}

.wrapper .users ul {
  list-style: none;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
      -ms-flex-direction: column;
          flex-direction: column;
  height: 100%;
}

.wrapper .users ul li {
  border: 1px solid #808080;
  height: 20%;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
}

.wrapper .users ul li.user1 {
  background-color: #ff7575;
}

.wrapper .users ul li.user2 {
  background-color: #7dff7d;
}

.wrapper .users ul li.user3 {
  background-color: #66f;
}

.wrapper .users ul li.user4 {
  background-color: #ffff80;
}

.wrapper .users ul li.user5 {
  background-color: #82ffff;
}

.wrapper .users ul li.no-active {
  background-color: #c0c0c0;
}

.wrapper .users ul li p.name {
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 10px;
}

li.item {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  font-size: 45px;
  color: #808080;
  font-weight: 700;
  background-color: #d4d4d4;
}

li.item.square {
  font-size: 20px;
  font-weight: normal;
  background-color: #fff;
}
</style>
