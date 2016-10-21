import _ from 'lodash'
import { attackAdBase } from '../attackAdCopy'
import { imaginexBase } from '../imaginexCopy'

const clearer = {
    heading: [],
    variable: [],
    fixed: [],
    sources: [],
    pictures:[],
    caption: false,
}
const mutations = {
    nextAd(idea, content){
        _.assign(idea.content, clearer, content)
    }
}


import { attackAdCopy } from '../attackAdCopy'
import { imaginexCopy } from '../imaginexCopy'
let attackAdCount = attackAdCopy.length
let imaginexCount = imaginexCopy.length

let i = 1
let k = 1
const actions = {
  NEXT_ATTACK({commit}) {
    let ad = _.clone(attackAdCopy[i])
    console.log(`Displaying ad #${i + 1}/${attackAdCount}: ${ad.heading[0]}`)
    commit('nextAd', ad)
    i = (i + 1) % attackAdCount
  },
  NEXT_IMAGINE_X({commit}) {
    let ad = _.clone(imaginexCopy[k])
    console.log(`Displaying ad #${k + 1}/${imaginexCount}`)
    commit('nextAd', ad)
    k = (k + 1) % imaginexCount
  }
}

let b = _.clone(imaginexBase)
const state = {
  content:b
}

export default {
  state,
  mutations,
  actions
}
