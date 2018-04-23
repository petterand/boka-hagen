import Vue from 'vue';
import Vuex from 'vuex';
import AuthService from './AuthService';
import BookingsService from './BookingsService';
import Utils from './Utils';


Vue.use(Vuex);

const state = {
   currentDate: new Date().getTime(),
   user: null,
   isTouchDevice: false,
   isLoggedIn: false,
   selectedDates: [],
   bookings: [],
   showRegister: false,
   menuOpen: false
};

const mutations = {
   LOGIN_SUCCESS(state, user) {
      state.user = user;
      state.isLoggedIn = true;
   },
   LOGOUT(state) {
      state.isLoggedIn = false;
      state.user = {};
   },
   IS_AUTHENTICATED(state, result) {
      state.isLoggedIn = result.isAuthenticated;
      if (result.user) {
         state.user = result.user;
      }
   },
   CHANGE_MONTH(state, direction) {
      const newDate = new Date(state.currentDate).setMonth(new Date(state.currentDate).getMonth() + direction);
      state.currentDate = newDate;
   },
   SELECT_DATES(state, dates) {
      state.selectedDates = dates;
   },
   RESET_SELECTED_DATES(state) {
      state.selectedDates = [];
   },
   SHOW_REGISTER(state, show) {
      state.showRegister = show;
   },
   SET_BOOKINGS(state, bookings) {
      state.bookings = [...state.bookings, ...bookings];
   },
   TOGGLE_MENU(state) {
      state.menuOpen = !state.menuOpen;
   },
   SCREEN_TOUCHED(state) {
      state.isTouchDevice = true;
   }
}

const actions = {
   changeMonth({ commit }, direction) {
      commit('CHANGE_MONTH', direction);
   },
   selectDates({ commit }, dates) {
      commit('SELECT_DATES', dates);
   },
   resetSelectedDates({ commit }) {
      commit('RESET_SELECTED_DATES');
   },
   login({ commit }, credentials) {
      return new Promise((resolve, reject) => {
         AuthService.authenticate(credentials).then((user) => {
            commit('LOGIN_SUCCESS', user);
            resolve();
         }, (err) => {
            reject();
         });
      })
   },
   logout({ commit }) {
      return new Promise((resolve, reject) => {
         AuthService.logout().then(() => {
            commit("LOGOUT");
            resolve();
         });
      });
   },
   fetchIsAuthenticated({ commit }) {
      return new Promise((resolve, reject) => {
         AuthService.isAuthenticated().then((result) => {
            commit("IS_AUTHENTICATED", result);
            resolve(result.isAuthenticated);
         });
      });
   },
   showRegister({ commit }, show) {
      commit("SHOW_REGISTER", show);
   },
   getBookings({ commit }) {
      return new Promise((resolve, reject) => {
         BookingsService.getBookings().then(bookings => {
            commit("SET_BOOKINGS", bookings);
         }, (err) => {
            reject(err);
         });
      });
   },
   bookDates({ commit, state }) {
      return new Promise((resolve, reject) => {
         const formattedDates = Utils.getDateRanges(state.selectedDates);
         BookingsService.bookDates(formattedDates).then((newBookings) => {
            commit("SET_BOOKINGS", newBookings);
         }, (err) => {
            reject(err);
         });
      });
   },
   toggleMenu({ commit }) {
      commit("TOGGLE_MENU");
   },
   screenTouched({ commit }) {
      commit("SCREEN_TOUCHED");
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