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
import Votes from './components/votes'
import Press from './components/press'

const routes = [
  { path: '/home', component: Imaginex },
  { path: '/nominate', component: Nominate },
  { path: '/votes', component: Votes },
  { path: '/press', component: Press },
  { path: '/*', component: Imaginex },
]
const router = new VueRouter({
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
