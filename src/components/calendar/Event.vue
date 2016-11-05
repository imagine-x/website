<template lang="jade">

.event
  popup(v-show='hovered')
  p {{ e.title || 'Thing'}}
</template>

<script>
  import Popup from './Popup.vue'
  export default {
    data() {
      return {
        hovered:false
      }
    },
    components: { Popup },
    props:['e']
  }

</script>

<style lang='stylus' scoped>
  @import "../../styles/main";

  .event
    position:relative
    float: left
    width: 100%
    font-size: .7em
    font-weight: bold


</style>
