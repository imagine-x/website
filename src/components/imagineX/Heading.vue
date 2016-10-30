<template lang="jade">

#heading
  .row
      .four.columns
        img.logo(
          src='../../../static/images/imaginex.svg',
          @click='next'
          )
      .eight.columns
          h1
            span(v-for='x in content')
              span.mark {{ x }}

</template>

<script>
export default {
    props: ['content'],
    methods:{
      next(){
        this.$store.dispatch('NEXT_IMAGINE_X')
      },
    },
}
</script>

<style lang="stylus" scoped>
  @import "../../styles/main"

  h1
    line-height: 1.5
    font-size: 30px
    color black
    padding:0
    font-weight: bold

img
  cursor:pointer

#heading
  content-align:center
  margin: 3rem 0;

</style>
