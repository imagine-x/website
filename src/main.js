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
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
const app = new Vue({
  router,
  store,
}).$mount('#app')
