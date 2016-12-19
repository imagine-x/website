import _ from 'lodash'

const mutations = {
  newNominee(nomination, newNominee) {
    console.log({
      newNominee
    })
    newNominee.support = 0
    nomination.nominees.unshift(newNominee)
  },
  endorseNominee(nomination,_id){
    console.log({_id})
    nomination.nominees.forEach(nominee => {
      if(nominee._id === _id){
        nominee.support++
      }
    })
  }
}

const state = {
  nominees: [{
    _id:1,
    name: 'Darcy Repen',
    why: 'Mayor Darcy Repen plans to file a human rights case over the structure of ICBC\'s rates, which he says punishes his community for traffic problems more than 300 km away from his village of Telkwa.',
    support: 10,
  }, {
    _id:2,
    name: 'Vicki Huntington',
    why: 'A very rare two term independent, lets make it three.',
    support: 15,
  }, {
    _id:3,
    name: 'David Bond',
    why: 'Binge watches Game of Thrones once a month, former banker. Always dreamed of being a dancer.',
    support: 0,
  }, {
    _id:4,
    name: 'Kenta Otani',
    why: 'Running in politics is a very big burden. Then you have to get shit done. High level of responsibility. I wouldn\'t mind running if I was closer to death.'  }, {
    why: 'A very rare two term independent, lets make it three.',
    support: 0
  },]
}

const actions = {}

export default {
  state,
  mutations,
  actions,
}
