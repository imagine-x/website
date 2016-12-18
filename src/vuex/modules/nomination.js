import _ from 'lodash'

const mutations = {
  newNominee(nomination, newNominee) {
    console.log({
      newNominee
    })
    nomination.nominees.unshift(newNominee)
  }
}

const state = {
  nominees: [{
    name: 'Darcy Repen',
    why: 'Mayor Darcy Repen plans to file a human rights case over the structure of ICBC\'s rates, which he says punishes his community for traffic problems more than 300 km away from his village of Telkwa.',
    support: 10,
  }, {
    name: 'Vicki Huntington',
    why: 'A very rare two term independent, lets make it three.',
    support: 15,
  }, {
    name: 'David Bond',
    why: 'Binge watches Game of Thrones once a month, former banker. Always dreamed of being a dancer.',
    support: 0,
  }, {
    name: 'Kenta Otani',
    why: 'Running in politics is a very big burden. Then you have to get shit done. High level of responsibility. I wouldn\'t mind running if I was closer to death.'  }, {
    name: 'Vicki Huntington',
    why: 'A very rare two term independent, lets make it three.'
  },]
}

const actions = {}

export default {
  state,
  mutations,
  actions,
}
