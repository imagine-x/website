import _ from 'lodash'

const mutations = {
    setMode(director, mode){
      director.mode = mode
    }
}

const state = {
  mode:"imagine"
}

let j = 1
let modes = ["attack", "imagine"]
const actions = {
  CHANGE_MODE({ commit }){
    j =  (j+1)%2
    console.log(`Entering ${modes[j]} mode!`)
    commit('setMode', modes[j])
  },
}



export default {
  state,
  mutations,
  actions,
}
