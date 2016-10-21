<template lang="jade">

#heading
  div
    img(
      src='../../../static/images/imaginex.svg',
      @click='next'
      )
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
    font-weight:900
    font-family: Montserrat,Arial,sans-serif
    line-height: 1.5
    font-size: 3rem
    margin: 2rem 0 1rem;
    color black
    padding:0

img
  cursor:pointer

#heading
  content-align:center

</style>
