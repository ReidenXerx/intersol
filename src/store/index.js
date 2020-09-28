import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currencyStack: {},
    range: []
  },
  mutations: {
    setStack(state, stack) {
      state.currencyStack = Object.assign({}, stack)
    },
    setRange(state, range) {
      state.range = range.concat()
      state.range.push('EUR')
    }
  },
  actions: {
    reloadStack(context, currencyName) {
      return new Promise((resolve) => {
        axios.get(`https://api.openrates.io/latest?base=${currencyName}`).then((response) => {
          if (currencyName == 'EUR') { //fix idiotic Api
            response.data.rates['EUR'] = 1
          }
          context.commit('setStack', response.data.rates)
        }).then(() => {resolve()})
      })
    },
    reloadRange(context) {
      return new Promise((resolve) => {
        axios.get('https://api.openrates.io/latest').then((response) => {
          context.commit('setRange', Object.keys(response.data.rates))
          console.log(Object.keys(response.data.rates))
        }).then(() => {resolve()})
      })
    }
  },
  modules: {
  },
  getters: {
    getCurrencyStack: (state) => state.currencyStack
  }
})
