import _ from 'lodash'
import request from 'superagent'

const mutations = {
  newNominee(nomination, newNominee) {
    newNominee.support = 1
    nomination.nominees.unshift(newNominee)
  },
  clearNominees(nomination){
    nomination.nominees = []
  },
  endorseNominee(nomination, options) {
    if (options.endorse) {
        nomination.nominees.forEach(nominee => {
            if (nominee.name === options.name) {
                nominee.support++
            }
        })
    } else {
        nomination.nominees.forEach(nominee => {
            if (nominee.name === options.name && nominee.support >= 1) {
                nominee.support--
            }
        })
    }
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
