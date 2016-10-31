import _ from 'lodash'

const mutations = {
    setMode(director, mode){
      director.mode = mode
    },
    setThankYou(director, thanks){
      director.thankYou = thanks
    }
}

const state = {
  mode:"imagine",
  thankYou: false
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
    console.log(state)
    commit('setThankYou', !state.thankYou)
  }
}





export default {
  state,
  mutations,
  actions,
}
