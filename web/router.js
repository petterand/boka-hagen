import VueRouter from 'vue-router';
import Vue from 'vue';
import store from './services/Store';

import index from './components/Index.vue';

Vue.use(VueRouter);

function waitForData(to, from, next) {
   if (store.state.dataLoaded === false) {
      store.watch(
         (state) => state.dataLoaded,
         (value) => {
            if (value === true) {
               next();
            }
         }
      )
   } else {
      next();
   }
}

// { path: '/', component: RecipeList, beforeEnter: waitForData }

const routes = [
   { path: '/', component: index }
];

export default new VueRouter({
   routes
});