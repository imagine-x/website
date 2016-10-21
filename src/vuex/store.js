import Vue from 'vue'
import Vuex from 'vuex'

import director from './modules/director'
import idea from './modules/idea'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    director,
    idea
  },
  middlewares: [],
  strict: process.env.NODE_ENV !== 'production'
})
