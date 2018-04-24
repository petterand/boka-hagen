import Vue from 'vue';
import VueResource from 'vue-resource';
import router from './router';
import store from './services/Store';
import eventHub from './services/EventHub';
import * as ModalDialogs from 'vue-modal-dialogs';

Vue.use(VueResource);
Vue.use(ModalDialogs);

var recipes = [];

new Vue({
   el: '#app',
   router,
   store
})