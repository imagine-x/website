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
    },
    setTou(director, state){
        director.tou = state
    },
    setEndorse(director, state) {
        director.endorse = state
    },
    setSubmitted(director, state){
        director.submitted = state
    }
}

const state = {
  mode:"imagine",
  thankYou: false,
  privacy: false,
  tou: false,
  endorse: false,
  submitted: false,
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
    if (mode) commit('setMode', mode)
  },
  TOGGLE_THANKYOU({ commit, state }){
    commit('setThankYou', !state.thankYou)
  },
  TOGGLE_PRIVACY({ commit, state }){
    commit('setPrivacy', !state.privacy)
  },
  TOGGLE_TOU({ commit, state}){
    commit('setTou', !state.tou)
  },
  TOGGLE_ENDORSE({ commit, state}){
    commit('setEndorse', !state.endorse)
  },
  TOGGLE_SUBMITTED({ commit, state}) {
    commit('setSubmitted', !state.submitted)
  }
}

export default {
  state,
  mutations,
  actions,
}
