<template lang="jade">

main
  .container
    heading(v-bind:content='idea.heading')
    hr
    .row
      .seven.columns.pitch
        variable-body(v-bind:content='idea.variable')
      .four.columns
        application
    hr
    div
      values(v-bind:content='idea.values')
      sources(v-bind:content='idea.sources')
    hr
    who
    hr

</template>

<script>
import VariableBody from '../generics/VariableBody.vue'
import Heading from './Heading.vue'
import Values from './Values'
import Who from '../generics/Who.vue'
import Sources from '../generics/Sources.vue'
import Application from '../generics/Application.vue'

export default {
    computed: {
      idea(){
          return this.$store.state.idea.content
      },
    },
    components: {
      VariableBody,
      Heading,
      Who,
      Sources,
      Application,
      Values
    },
}
</script>

<style lang="stylus" scoped>
  @import "../../styles/main"


  hr
    border-top:1px solid black;

  .pitch
    text-align:center
    padding-top:2em

</style>
