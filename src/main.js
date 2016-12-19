// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import store from './vuex/store'

Vue.use(VueRouter)
Vue.use(Vuex)

import Imaginex from './components/imagineX'
import Nominate from './components/nominate'
import MainNominees from './components/nominate/MainNominees'
import Nomination from './components/nominate/Nomination'

import Votes from './components/votes'
import News from './components/news'



const routes = [{
  path: '/home',
  component: Imaginex
}, {
  path: '/nominate',
  component: Nominate,
  children: [{
    path: '',
    component: MainNominees
  }, {
    path: 'form',
    component: Nomination
  }]
}, {
  path: '/votes',
  component: Votes
}, {
  path: '/news',
  component: News
}, {
  path: '/*',
  component: Imaginex
}, ]
const router = new VueRouter({
  mode:'history',
  routes
})
const app = new Vue({
  router,
  store,
}).$mount('#app')

//
// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// })
