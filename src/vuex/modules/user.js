import _ from 'lodash'
import request from 'superagent'

const mutations = {
    login(user, login){
        user.login = login
    },
    serverLogin(user, serverId){
        user.serverId = serverId
    }
}


const state = {
    login: {
        mail:'',
        postal:'',
        name:'',
    },
    serverId: ''
}

const actions = {
    LOGIN({commit}, login){
        commit('login', login)
        request
            .post('/x/login')
            .send(login)
            .then(res => {
                commit('serverLogin', res)
            })
            .catch(console.log)
    }
}

export default {
  state,
  mutations,
  actions,
}
