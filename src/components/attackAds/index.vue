<template lang="jade">

main
  .container.main
    img(
      src='../../../static/images/christy.png',
    )
    .row
      .seven.columns.copy
          heading(v-bind:content='idea.heading')
          variable-body(v-bind:content='idea.variable')
          fixed-body(v-bind:content='idea.fixed')
          sources(v-bind:content='idea.sources', color='#FFFF00')
      .five.columns
          application
    hr
    .row
      who

</template>

<script>

import Heading from './Heading.vue'
import VariableBody from './VariableBody.vue'
import FixedBody from './FixedBody.vue'
import Application from './Application.vue'
import Who from '../generics/Who.vue'
import Sources from '../generics/Sources.vue'

export default {
    methods:{
      next: ()=> console.log('next')
    },
    computed: {
      idea(){
        return this.$store.state.idea.content
      },
    },
    components: {
      Heading,
      VariableBody,
      FixedBody,
      Application,
      Sources,
      Who,
    }
}

</script>

<style lang="stylus" scoped>
  @import "../../styles/main"

  main
    display: block
    position: fixed
    z-index: -1
    left: 0
    top: 0
    width: 100%
    height: 100%
    overflow: auto
    background-color:#14123B
    color:white

  .main
    margin-top:4em

  img /*head*/
    z-index:100
    position:fixed
    top:0
    right:0
    height: 170px
    cursor: pointer

  .copy
    overflow:hidden


</style>
