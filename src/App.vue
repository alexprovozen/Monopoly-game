<template>
  	<div class="wrapper">
			<div class="game-place">
				<div class="checks">
					<div class="check user1">1</div>
					<div class="check user2">2</div>
					<div class="check user3">3</div>
					<div class="check user4">4</div>
					<div class="check user5">5</div>
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
							<div class="start-message">
								<h3>Добро пожаловать в мир Монополии!</h3>
								<i>Выберите количество играков и введите их имена.</i><hr>
								<span>Количество играков:</span>
								<select @change="count = +$event.target.value;" name="quantity-players" id="quantity-players">
									<option :value="index + 2" v-for="(opt,index) of 4" :key="index">{{ index + 2 }}</option>
								</select><br>
								<div class="names">
									<div v-for="(n, index) of count" :key="index">
										<label :for="'player-' + (index+1)">Игрок {{ index + 1 }}</label>
										<input type="text" :id="'player-' + (index+1)"><br>
									</div>
									
									
								</div>
								<hr>
								<input type="button" @click="startGame" value="Начать игру" id="start-game">
							</div>
							<div class="playerProgress">
								<div class="timeOut">
									20
								</div>
								<button class="run" @random="setOrder">Бросить кубики</button>
								<button class="buy">Купить</button>
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
</template>

<script>
//import AppPlayer from './assets/Player'

export default {
	
  data () {
    return {
			count: 2,
			players: []
    }
	},
	methods: {
		startGame() {
			let error = false;
			let inputs = document.querySelectorAll('.names input');
			for (let input of inputs) {
				let player = {
					name: input.value,
					money: 1000000,
					counter: 0,
				}
				this.players.push(player);
				if (!input.value) {
					input.classList.add('error');
					error = true;
				} else {
					input.classList.remove('error');
				}
			}
			if(!error) {
				document.querySelector('.start-message').style.display = 'none';
				document.querySelector('.run').style.display = 'block';
			}
			this.sendChat('Игра началась', 'info');
			this.sendChat('Определяем очередь игроков', 'info');
			this.setOrder()
		},
		sendChat(message, type) {
			let p = document.createElement('p');
			p.className = type;
			p.innerHTML = message;
			let chat = this.$refs.chat;
			chat.appendChild(p);
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
				this.sendChat(`Игрок <b>${this.players[i].name}</b> выбрасывает ${random[0]} и ${random[1]}`, 'info');
				//проверяем наличие повторений
				if (i > 0) {
					for(let k = 0; k<i; k++) {
						if (this.players[i].randomSum === this.players[k].randomSum) {
							let random = this.getRandomNumbers();
							this.players[i].randomSum = random[0] + random[1];
							this.sendChat(`Игрок <b>${this.players[i].name}</b> перебрасывает ${random[0]} и ${random[1]}`, 'info');
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
		}
	}
}
</script>

<style lang="stylus">
@import './assets/_libs.styl'

.wrapper
	display: flex
	min-height: 100vh
	margin: 0 auto

	.game-place
		height calc(100vh - 30px)
		width calc(100vh * 1.54 - 30px)
		border 1px solid black
		box-sizing border-box
		margin 15px 10px
		flex-shrink 0
		position relative

		.top ul, .middle ul, .bottom ul
			list-style none
			display flex
			flex-direction row
			box-sizing border-box

		.top li, .middle li, .bottom li
			border: 1px solid grey
			box-sizing: border-box

		.top li, .bottom li
			width: calc(70% / 11)

			&.square
				width: 15%
				&>div
					position: relative
					width: 100%
					padding-bottom: 100%
					&>div
						width: 100%
						height: 100%
						position: absolute
						display: flex
						justify-content: center
						align-items: center

		.middle
			height: 53%
			
			.container
				display: flex
				flex-direction: row
				height: 100%

				.left, .right
					width: 15%
					display: block
					border: none
					&>ul
						display: flex
						flex-direction: column
						height: 100%
						&>li.item
							height: 19%
						&>li.center
							height: 24%
							width: 100%
					
				.center
					width: 70%
					display: flex
					flex-direction: row
					
					.monitor
						width: 70%
						border-right: 2px solid grey
						display: flex
						flex-direction: column
						justify-content: center
						align-items: center

						i 
							margin: 10px
							font-size: 12px
						hr
							margin: 10px 0

						.names input
							border 1px solid black
							margin: 5px 0

							&.error
								outline: 1px solid #c40f13

						.playerProgress
							.timeOut
								font-size: 50px
								display none
								text-align center
							.run, .buy, .next
								display none
								margin-top 20px


						

					.chat
						width: 30%
						padding: 5px
						overflow: auto

						p.info
							font-size: 12px
							color: grey

						p.trade
							font-size: 12px
							color: #009688

						p.exit
							font-size: 12px
							color: red

		.checks
			.check
				height: 20px
				width: 20px
				border-radius: 50%
				position: absolute
				text-align: center
				display: none
				&.user1
					background-color: #ff7575
					top: 30px
					left: 10px
				&.user2
					background-color: #7dff7d
					top: 30px
					left: 35px
				&.user3
					background-color: #6666ff
					top: 30px
					left: 60px
				&.user4
					background-color: #ffff80
					top: 30px
					left: 85px
				&.user5
					background-color: #82ffff
					top: 30px
					left: 110px

	.users
		height: calc(100vh - 30px)
		width: calc(100vh * 0.4 - 30px)
		border: 1px solid black
		box-sizing: border-box
		margin: 15px 10px
		flex-shrink: 0

		ul
			list-style: none
			display: flex
			flex-direction: column
			height: 100%

			li
				border: 1px solid grey
				height: 20%
				box-sizing: border-box
				display: flex
				flex-direction: column
				justify-content: center
				align-items: center

				&.user1
					background-color: #ff7575
				&.user2
					background-color: #7dff7d
				&.user3
					background-color: #6666ff
				&.user4
					background-color: #ffff80
				&.user5
					background-color: #82ffff
				&.no-active
					background-color: #c0c0c0

				p.name
					font-weight: 700
					font-size: 20px
					margin-bottom: 10px


li.item
	display: flex
	justify-content: center
	align-items: center
	font-size: 45px
	color: grey
	font-weight: 700
	background-color: #d4d4d4

li.item.square
	font-size: 20px
	font-weight: normal
	background-color: white

</style>
