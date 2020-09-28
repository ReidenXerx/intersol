<template>
  <div id="MainLayout">
		<div class="title-container">
			<h3>Курс {{currentCurrencyName}} сегодня</h3>
		</div>
		<div class="tabs-container">
			<Currency v-for="(currency, index) in currencyStack" :key="index" :index="index" :name="currency[0]" :value="currency[1]" :isActive="isActiveStack[index]" v-on:isActiveSwitchEvent="isActiveSwitch"/>
      <div class="controls left" @click="scrollLeft"><b-icon icon="caret-left-fill
" aria-hidden="true"></b-icon></div>
      <div class="controls right" @click="scrollRight"><b-icon icon="caret-right-fill
" aria-hidden="true"></b-icon></div>
		</div>
		<div class="workarea-container">
			<div class="inputCurrency">
				<b-form-input class="input" v-model="currenCurrencyNumber" :type="'number'" placeholder="Введите количество валюты"></b-form-input>
				<span>{{currentCurrencyName}}</span>
			</div>
			<div class="tiles">
				<div class="tile">
					<div class="header">{{currenCurrencyNumber}} <span>{{currentCurrencyName}} =</span></div>
					<div class="value">{{(currencyStack[26][1]*currenCurrencyNumber).toFixed(2)}}<span>RUB</span></div>
				</div>
				<div class="tile">
					<div class="header">{{currenCurrencyNumber}} <span>{{currentCurrencyName}} =</span></div>
					<div class="value">{{(currencyStack[3][1]*currenCurrencyNumber).toFixed(2)}}<span>CAD</span></div>
				</div>
				<div class="tile">
					<div class="header">{{currenCurrencyNumber}} <span>{{currentCurrencyName}} =</span></div>
					<div class="value">{{(currencyStack[11][1]*currenCurrencyNumber).toFixed(2)}}<span>HRK</span></div>
				</div>
				<div class="tile">
					<div class="header">{{currenCurrencyNumber}} <span>{{currentCurrencyName}} =</span></div>
					<div class="value">{{(currencyStack[17][1]*currenCurrencyNumber).toFixed(2)}}<span>JPY</span></div>
				</div>
			</div>
      <div class="controls">
        <b-button class="previous" @click="previousCurrency"><b-icon icon="chevron-left" aria-hidden="true"></b-icon> НАЗАД</b-button>
        <b-button class="next" @click="nextCurrency">ДАЛЕЕ <b-icon icon="chevron-right" aria-hidden="true"></b-icon></b-button>
      </div>
		</div>
  </div>
</template>
<script>
import Currency from '@/components/Currency.vue'
export default {

	components: {
	  Currency
	},

  name: "",

	data: () => ({
		currencyStack: [],
		currentCurrencyName: 'EUR',
    currentCurrencyIndex: 8,
		isActiveStack: [],
		currenCurrencyNumber: 0
  }),
	beforeMount() {
	  //do something before mounting vue instance
		this.reloadAll(() => {
			for (let i = 0; i < Object.keys(this.currencyStack).length; i++) {
				this.isActiveStack.push(false)
			}
		})
	},
	watch: {
		currentCurrencyName() {
			this.reloadCurrencyStack()
		},
    currentCurrencyIndex() {
      this.isActiveStackNuller()
			this.$set(this.isActiveStack, this.currentCurrencyIndex, !this.isActiveStack[this.currentCurrencyIndex])
    }
	},
	methods: {
		isActiveStackNuller() {
			for (let i = 0; i < this.isActiveStack.length; i++) {
				this.$set(this.isActiveStack, i, false)
			}
		},
		reloadAll(callback = () => false) {
			this.$store.dispatch('reloadRange').then(() => {
				this.$store.dispatch('reloadStack', this.currentCurrencyName).then(() => {
					this.currencyStack = Object.entries(this.$store.getters.getCurrencyStack).sort()
					callback()
				})
			})
		},
		reloadCurrencyStack(callback = () => false) {
			this.$store.dispatch('reloadStack', this.currentCurrencyName).then(() => {
				this.currencyStack = Object.entries(this.$store.getters.getCurrencyStack).sort()
				callback()
			})
		},
	  isActiveSwitch(index) {
			console.log(Object.entries(this.currencyStack));
			this.currentCurrencyName = this.currencyStack[index][0]
      this.currentCurrencyIndex = index
	  },
    previousCurrency() {
      this.currentCurrencyIndex--
      this.currentCurrencyName = this.currencyStack[this.currentCurrencyIndex][0]
    },
    nextCurrency() {
      this.currentCurrencyIndex++
      this.currentCurrencyName = this.currencyStack[this.currentCurrencyIndex][0]
    },
    scrollLeft() {
      let element = document.querySelector('.tabs-container')
      element.scrollLeft -= 50
    },
    scrollRight() {
      let element = document.querySelector('.tabs-container')
      element.scrollLeft += 50
    }
	}
}
</script>
<style lang="scss" scoped>
#MainLayout {
	display: flex;
	flex-direction: column;
	background-color: #FFE782;
	padding-top: 30px;
  color: #2B2D33;
	.title-container {
		padding-left: calc(2% + 30px);
		h3 {
			text-align: left;
		}
	}
	.tabs-container {
		display: flex;
		flex-direction: row;
    overflow: hidden;
    .controls {
      position: absolute;
      cursor: pointer;
      color: #CCAE68;
    }
    .left {
      margin-top: 20px;
      padding-left: 10px;
    }
    .right {
      margin-top: 20px;
      right: 0;
      padding-right: 10px;
    }
	}
	.workarea-container {
    display: flex;
    flex-direction: column;
		background-color: white;
		.inputCurrency {
			display: flex;
			justify-content: flex-end;
			padding-left: 1%;
			padding-right: 1%;
			margin-top: 34px;
			.input {
				border: none;
				border-radius: 0;
				border-bottom: 1px solid #D9D9D9;
				text-align: right;
				width: 20%;
				font-weight: bold;
			}
			span {
				line-height: 2.4;
			}
		}
		.tiles {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-around;
			margin-top: 25px;
			.tile {
				display: flex;
				width: 48%;
				height: calc(70px + 5vw);
				flex-direction: column;
				justify-content: space-around;
				border-radius: 12px;
				box-shadow: rgba(99, 99, 99, 0.2) 1px 1px 5px 0px;
				padding-left: 38px;
				padding-bottom: calc(3px + 1vw);
				padding-top: calc(3px + 1vw);
				margin-bottom: 17px;
				font-weight: lighter;
        min-width: 300px;

				.header {
					font-size: calc(12px + 0.7vw);
					display: flex;
					span {
						display: inline;
						color: #B9B9B9;
						padding-left: 5px;
					}
				}
				.value {
					font-size: calc(24px + 1.8vw);
					display: flex;
					span {
						display: flex;
						font-size: calc(12px + 0.7vw);
						align-self: flex-end;
						line-height: 2.3;
						padding-left: 5px;
					}
				}
			}
		}
    .controls {
      width: 245px;
      display: flex;
      justify-content: space-between;
      align-self: center;
      margin-top: 40px;
      button {
        width: 112px;
        border: none;
        box-shadow: rgba(99, 99, 99, 0.2) 1px 1px 5px 0px;
        color: #2B2D33;
        font-size: 14px;
      }
      .next {
        background-color: white;
      }
      .previous {
        background-color: #EFEFEF;
      }
    }
	}
}
</style>
