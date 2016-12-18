import _ from 'lodash'

const mutations = {
    setMode(director, mode){
      director.mode = mode
    },
    setThankYou(director, thanks){
      director.thankYou = thanks
    },
    setPrivacy(director, thanks){
      director.privacy = thanks
    }
}

const state = {
  mode:"imagine",
  thankYou: false,
  privacy: false
}

let j = 1
let modes = ["nominate", "votes", "imagine"]
let thanks = false
const actions = {
  SET_MODE_BY_URL({ commit }, url){
    if (url === '/votes'){
      commit('setMode', 'votes')
    }
  },
  CHANGE_MODE({ commit }, mode){
    console.log({mode})
    if (mode) commit('setMode', mode)
  },
  TOGGLE_THANKYOU({ commit, state }){
    commit('setThankYou', !state.thankYou)
  },
  TOGGLE_PRIVACY({ commit, state }){
    commit('setPrivacy', !state.privacy)
  }
}

export default {
  state,
  mutations,
  actions,
}
