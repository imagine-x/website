<template lang="jade">

div
  .sources(v-show='!!content.length')
    span Sources :
    div(v-for='(link, index) in content')
      a.source(
        v-bind:href='link',
        target="_blank",
        :style='style'
        ) ~{{index}}~{{link}}

</template>

<script>
export default {
  props:['content', 'color'],
  computed: {
    style(){
      return {
        color: this.color
      }
    }
  }
}

</script>

<style lang="stylus" scoped>
  @import "../../styles/main"

  .source
    padding:0
    padding:10px
    font-size:.7em

</style>
