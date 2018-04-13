import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

const state = {
   currentDate: new Date().getTime()
};

const mutations = {
   CHANGE_MONTH(state, direction) {
      const newDate = new Date(state.currentDate).setMonth(new Date(state.currentDate).getMonth() + direction);
      state.currentDate = newDate;
   }
}

const actions = {
   changeMonth({ commit }, direction) {
      commit('CHANGE_MONTH', direction);
   }
};

const getters = {
   getNextMonth(state) {
      return new Date(state.currentDate).getMonth() + 1;
   },
   getPreviousMonth(state) {
      return new Date(state.currentDate).getMonth() - 1;
   },
   getCurrentMonth(state) {
      return new Date(state.currentDate).getMonth();
   }
}

export default new Vuex.Store({
   state,
   getters,
   actions,
   mutations
});