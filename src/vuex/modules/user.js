import _ from 'lodash'
import request from 'superagent'

const mutations = {
    login(user, login){
        console.log('setting login', login)
        user.login = login
    },
    serverLogin(user, serverId){
        console.log('setting serverId', serverId)
        user.serverId = serverId
    }
}


const state = {
    login: {
        mail:'',
        postal:'',
        name:'',
    },
    serverId: null
}

const actions = {
    LOGIN({commit, dispatch}, login){
        commit('login', login)
        request
            .post('/x/login')
            .send(login)
            .then(res => {
                let serverId = res.text.replace("\"", "")
                commit( 'serverLogin', serverId )
                commit('setEndorseWithServerId', serverId)
            })
            .catch(console.log)

    }
}

export default {
  state,
  mutations,
  actions,
}
