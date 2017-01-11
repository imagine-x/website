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


let serverId = window.localStorage.getItem('_id') || '5'
const state = {
    login: {
        mail:'',
        postal:'',
        name:'',
    },
    serverId
}

const actions = {
    LOGIN({commit, dispatch}, login){
        commit('login', login)
        commit( 'serverLogin', '5' )
        request
            .post('/x/login')
            .send(login)
            .then(res => {
                let serverId = res.text.replace(/\"/, "").replace(/\"/, "")
                window.localStorage.setItem('_id', serverId)
                commit( 'serverLogin', serverId )
                commit('setEndorseWithServerId', serverId)
            })
    }
}

export default {
  state,
  mutations,
  actions,
}
