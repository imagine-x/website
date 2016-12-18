import Vue from 'vue'
import Vuex from 'vuex'

import director from './modules/director'
import idea from './modules/idea'
import visualizeVotes from './modules/visualizeVotes'
import nomination from './modules/nomination'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    director,
    idea,
    visualizeVotes,
    nomination,
  },
  middlewares: [],
  strict: process.env.NODE_ENV !== 'production'
})
