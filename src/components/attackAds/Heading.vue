<template lang="jade">

#heading
  h1
    span(v-for='x in content')
      span.mark {{ x }}
      br

</template>

<script>
export default {
    props: ['content']
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

  .mark
    border-style:solid
    border-color:yellow
    border-thickness:15px
    background: yellow
    padding:4px
    margin:0



</style>
