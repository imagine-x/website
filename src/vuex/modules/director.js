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
  privacy: true
}

let j = 1
let modes = ["attack", "imagine"]
let thanks = false
const actions = {
  CHANGE_MODE({ commit }){
    j =  (j+1)%2
    console.log(`Entering ${modes[j]} mode!`)
    commit('setMode', modes[j])
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
