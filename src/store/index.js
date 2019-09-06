import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 1
  },
  getters: {
    getStateCount: function (state) {
      return state.count + 1;
    }
  },
  mutations: {
    add(state, n) {
      state.count = state.count + n
    },
    reduction(state, n) {
      state.count = state.count - n
    }
  },
  actions: {
    addFun(context, n) {
      context.commit('add', n)
    },
    reductionFun(context, n) {
      context.commit('reduction', n)
    }
  }
})
export default store