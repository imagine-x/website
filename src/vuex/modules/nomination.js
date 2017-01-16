import _ from 'lodash'
import request from 'superagent'

const mutations = {
  setEndorseWithServerId(nomination, serverId) {
    nomination.nominees.forEach(nominee => {
      if (_.indexOf(nominee.supporters, serverId) > -1) {
        nominee.endorsed = true
      }
    })

  },
  newNominee(nomination, newNominee) {
    if (!newNominee.supporters) {
      newNominee.supporters = []
    }
    nomination.nominees.unshift(newNominee)
  },
  clearNominees(nomination) {
    nomination.nominees = []
  },
  endorseNominee(nomination, nameSupporterId) {
      nomination.nominees.forEach(nominee => {
        if (nominee.name === nameSupporterId.name) {
          nominee.supporters.push(nameSupporterId.supporterId)
        }
      })
  },
  unendorseNominee(nomination, nameSupporterId) {
      nomination.nominees.forEach(nominee => {
        if (nominee.name === nameSupporterId.name) {
            nominee.supporters.splice(
                _.indexOf(nominee.supporters, nameSupporterId.supporterId)
            )
        }
      })
  }
}

const actions = {
  NOMINATE({commit}, nominee) {
    commit('newNominee', nominee)
    request
      .post('/x/nomination')
      .send(nominee)
      .then(console.log)
  },

  GET_NOMINEES({commit}) {
    request
      .get('/x/nominees')
      .then(res => {
          let nominees
          try {
             nominees = JSON.parse(res.text)
          }catch(err) {}
          if (nominees){
              commit('clearNominees')
              nominees.forEach(nominee => commit('newNominee', nominee))
          }
      })
  },
  TOGGLE_NOMINEE_ENDORSEMENT({state, commit}, endorseObj) {
      let done = false
      console.log('TOGGLE_NOMINEE_ENDORSEMENT', state)
      state.nominees.forEach(nominee => {
          if (nominee.name === endorseObj.name){
              nominee.supporters.forEach(supporterId => {
                  console.log(supporterId, endorseObj)
                  if (supporterId === endorseObj.supporterId){
                      done = true
                      commit('unendorseNominee', endorseObj)
                      console.log('POST /x/unendorse')
                      request
                          .post('/x/unendorse')
                          .send(endorseObj)
                          .then(console.log)
                  }
              })
              if (!done){
                  commit('endorseNominee', endorseObj)
                  console.log('POST /x/endorse')
                  request
                      .post('/x/endorse')
                      .send(endorseObj)
                      .then(console.log)
              }
          }
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
