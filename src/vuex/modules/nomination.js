import _ from 'lodash'
import request from 'superagent'

const mutations = {
  setEndorseWithServerId(nomination, serverId){
      nomination.nominees.forEach(nominee => {
          if ( _.indexOf(nominee.supporters, serverId) > -1 ){
              nominee.endorsed = true
          }
      })

  },
  newNominee(nomination, newNominee) {
    if (!newNominee.support){
        newNominee.support = 1
    }
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
    NOMINATE({commit}, info){
        request
            .post('/x/nomination')
            .send(info)
    },

    GET_NOMINEES( {commit} ){
        request
            .get('/x/nominees')
            .then( res => {
                let nominees = JSON.parse(res.text)
                console.log('GOT NOMINEES:', {nominees})
                commit('clearNominees')
                nominees.forEach( nominee => commit('newNominee', nominee) )
            })
    },
    TOGGLE_NOMINEE_ENDORSEMENT({commit}, nominee){

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
