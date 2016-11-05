import Vue from 'vue'
import Vuex from 'vuex'

import director from './modules/director'
import idea from './modules/idea'
import calendar from './modules/calendar'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    director,
    idea,
    calendar,
  },
  middlewares: [],
  strict: process.env.NODE_ENV !== 'production'
})
