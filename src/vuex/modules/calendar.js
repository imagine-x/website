import _ from 'lodash'

const mutations = {
  setEvents(calendar, events) {
    calendar.events = events
  },
}

const state = {
  events: [{
    title: 'Clinton or Trump??',
    when: {
      day: 8,
      month: 11,
      year: 2016,
      hour: 18,
    }
  },{
    title: 'meeting',
    when: {
      day: 9,
      month: 11,
      year: 2016,
      hour: 18,
    }
  }, {
    title: 'meeting',
    when: {
      day: 16,
      month: 11,
      year: 2016,
      hour: 18,
    }
  }, {
    title: 'meeting',
    when: {
      day: 23,
      month: 11,
      year: 2016,
      hour: 18,
    }
  }, {
    title: 'meeting',
    when: {
      day: 30,
      month: 11,
      year: 2016,
      hour: 18,
    }
  }, ]
}

export default {
  state,
  mutations,
  actions: {},
}
