import _ from 'lodash'

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
  }
}

const actions = {
}


const state = {
  nominees: [{
    _id: 1,
    name: 'Darcy Repen',
    why: 'Mayor Darcy Repen plans to file a human rights case over the structure of ICBC\'s rates, which he says punishes his community for traffic problems more than 300 km away from his village of Telkwa.',
    support: 9,
    contact: "",
    link: "https://www.test.com",
    occupation: "Mayor",
    official: false,
    location: "The North",
    riding: "Stikine",
  }, {
    _id: 2,
    name: 'Vicki Huntington',
    why: 'A very rare two term independent, lets make it three.',
    support: 9,
    contact: "",
    link: "http://www.test.com",
    occupation: "MLA",
    official: true,
    location: "Delta",
    riding: "Delta South"
  }, {
    _id: 3,
    name: 'David Bond',
    why: 'Binge watches Game of Thrones once a month, former banker. Always dreamed of being a dancer.',
    support: 1,
    location: "Okanagan",
    riding: "Okanagan-Westside"
  }, {
    _id: 4,
    name: 'Kenta Otani',
    why: 'Running in politics is a very big burden. Then you have to get shit done. High level of responsibility. I wouldn\'t mind running if I was closer to death.',
    support: 4,
    location: "The North",
    riding: "Peace River South"
  }, {
    _id: 5,
    name: 'Goldilocks',
    why: 'Just right.',
    official:true,
    support: 3,
    location: "Okanagan",
    riding: "Okanagan-Westside"
  }, ]
}


export default {
  state,
  mutations,
  actions,
}
