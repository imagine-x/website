<template lang="jade">
.container
  div
  div
    imagine-x(v-if='mode!=="attack"')
    attack-ads(v-else)
  div
    img(
      src='../../static/images/hamburger.svg',
      @click='changeMode'
      )#modeswitcher

</template>


<script>

  import store from '../vuex/store'
  import attackAds from './attackAds'
  import imagineX from './imagineX'

  export default {
      methods:{
        changeMode(){
          if (this.mode ==="attack"){
            this.$store.dispatch(`CHANGE_MODE`)
            this.$store.dispatch(`NEXT_IMAGINE_X`)
          }else {
            this.$store.dispatch(`CHANGE_MODE`)
            this.$store.dispatch(`NEXT_ATTACK`)
          }
        }
      },
      computed: {
        mode(){
          return this.$store.state.director.mode
        },
      },
      components: {
        attackAds,
        imagineX
      },
      store,
      computed: {
        mode(){
          return this.$store.state.director.mode
        }
      },
  }
</script>


<style lang="stylus">
  .container
    margin-top: 10rem;

  body
    width: initial;
    border: 10px solid black;
    margin: 0;
    padding-bottom: 5rem;

  #modeswitcher
    z-index: 1e10
    position:fixed
    top:0
    left:0
    cursor:pointer

</style>
