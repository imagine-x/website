import _ from 'lodash'
import request from 'superagent'

const mutations = {
  newNominee(nomination, newNominee) {
    newNominee.support = 1
    nomination.nominees.unshift(newNominee)
  },
  endorseNominee(nomination, name) {
    nomination.nominees.forEach(nominee => {
      if (nominee.name === name) {
        nominee.support++
      }
    })
  },
  clearNominees(nomination){
    nomination.nominees = []
  }
}

const actions = {
  GET_NOMINEES( {commit} ){
    request
        .get('/nominees')
        .then( res => {
            let nominees = JSON.parse(res.text)
            commit('clearNominees')
            nominees.forEach(nominee => {
              commit('newNominee',nominee)
            })
        })
  }
}

const state = {
  nominees: []
}


export default {
  state,
  mutations,
  actions,
}
