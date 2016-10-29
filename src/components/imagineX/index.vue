<template lang="jade">

main
    heading(v-bind:content='idea.heading')
    .row
      .four.columns
        application
      .seven.columns.pitch
        variable-body(v-bind:content='idea.variable')
        hr
        values(v-bind:content='idea.values')
        sources(v-bind:content='idea.sources')
        hr
        who

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
    padding-top:2em

</style>
