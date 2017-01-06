import _ from 'lodash'
import request from 'superagent'

const mutations = {
    login(user, login){
        console.log('Now logged in', login)
        user.login = login
    },
}


const state = {
    login: {
        name:'',
        mail: '',
        postal: '',
    }
}

const actions = {
    LOGIN({commit}, login){
        commit('login', login)
        request
            .post('/x/login')
            .send(login)
            .then(res => {
                console.log("success response!", {res})
            })
            .catch(console.log)
    }
}

export default {
  state,
  mutations,
  actions,
}
