import _ from 'lodash'

const mutations = {
  setSelectedBill(visualizeVotes, bill){
    visualizeVotes.bill = bill
  },
  setShowDetails(visualizeVotes, showDetails){
    visualizeVotes.showDetails = showDetails
  },
}

const state = {
  bill: {
    bill: null
  },
  showDetails: false
}

export default {
  state,
  mutations,
}
