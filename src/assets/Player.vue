<template>
	<li :class="'user' + (index + 1)">
		<p class="name">{{ name }}</p>
		<p class="money">${{ money }}</p>
		{{getRandomNumbers()}}
	</li>

</template>

<script>
export default {
	props: ['name', 'index'],
  data () {
    return {
			money: 1000000,
			numbers: {
				number1: 0,
				number2: 0,
			}
    }
	},
	computed: {
		
	},
	methods: {
		changeMoney() {
			this.money
		},
		getRandomNumbers() {
			this.numbers.number1 = Math.round(1 - 0.5 + Math.random() * (6 - 1 + 1));
			this.numbers.number2 = Math.round(1 - 0.5 + Math.random() * (6 - 1 + 1));
			this.$emit('random', this.numbers)
			return this.numbers.number1 + this.numbers.number2;
		}
	}
}
</script>



<style>

</style>

