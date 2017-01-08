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
            .then(console.log)
            .catch(console.log)
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
    ENDORSE_NOMINEE( {commit, state}, endorseData ){
        commit('endorseNominee', {
            endorse:true,
            name: endorseData.nominee,
        })
        request
            .post('/x/endorse')
            .send(endorseData)
            .then(console.log)
            .catch(console.log)
    },
    UNENDORSE_NOMINEE( {commit, state}, endorseData ){
        commit('endorseNominee', {
            name: endorseData.nominee,
            endorse:false,
        })
        request
            .post('/x/unendorse')
            .send(endorseData)
            .then(console.log)
            .catch(console.log)
    },

}

const state = {
  nominees: []
}


export default {
  state,
  mutations,
  actions,
}
