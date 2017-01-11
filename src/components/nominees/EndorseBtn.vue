<template>

<div role="button" :class="c" @click="endorse(name)" tabindex="0">
  <i class="fa fa-thumbs-up thumbs-up"></i>
  <span v-if="userEndorsed">Endorsed</span>
  <span v-else>Endorse</span>
</div>

</template>


<script>
import _ from 'lodash'
import request from 'superagent'

export default {
  props: ['name'],
  computed: {
      c(){
          return {
              endorse: true,
              'is-endorsed':this.userEndorsed
          }
      },
      userEndorsed(){
          let userEndorsed
          let serverId = this.$store.state.user.serverId
          let supporters = []
          this.$store.state.nomination.nominees.forEach(nominee => {
              if (this.name === nominee.name){
                  userEndorsed = _.indexOf(nominee.supporters, serverId) > -1
              }
          })
          return userEndorsed
      }
  },
  methods: {
    endorse(nominee){
        let serverId = this.$store.state.user.serverId
        if (!serverId){
            return this.showEndorseModal()
        }

        this.$store.dispatch('TOGGLE_NOMINEE_ENDORSEMENT', {
            name: nominee,
            supporterId:serverId
        })
    },
    showEndorseModal(){
        this.$store.dispatch('TOGGLE_ENDORSE')
    }
  }
}

</script>


<style lang="stylus" scoped>
@import "../../styles/main"

.official-mark {
    font-size: 20px;
    color: #4CAF50;
}

.official-mark-container {
    width: 3rem;
    cursor: pointer;
}

.endorse {
    display: inline-block;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
    padding: 0.65rem 1.2rem;
    border: 1px solid black;
    line-height: 1.2;
    margin-right: 0.5rem;
    cursor: pointer;
}

.endorse:hover {
    color: white;
    background-color: black;
}

.endorse.is-endorsed {
    color: gray;
    background-color: lightgray;
    border: lightgray;
    cursor: pointer;
}

.endorse.is-endorsed:hover {
    color: black;
    background-color: darkgray;
    border: darkgray;
}

.thumbs-up {
    margin-left: 0;
    margin-right: 0.5rem;
}

.nominee-card {
    padding: 4rem 0;
    border-bottom: 1px solid black;
}

.nominee-card:first {
    border-top: 1px solid black;
}

.nominee-card:last-child {
    border-bottom: 0;
    padding-bottom: 0;
}

.nominee-card__name {
    margin-bottom: 0.75rem;
}

.why-block {
    margin-bottom: 1rem;
}
</style>
