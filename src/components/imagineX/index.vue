<template lang="jade">

main
  .container
    heading(v-bind:content='idea.heading')
    .four.columns
      application
    .seven.columns.pitch
      variable-body(v-bind:content='idea.variable')
    div
      values(v-bind:content='idea.values')
      sources(v-bind:content='idea.sources')
    hr
    who

</template>

<script>
// import { Who } from '../attackAds/Who.vue'

import VariableBody from '../generics/VariableBody.vue'
import Heading from './Heading.vue'
import Values from './Values'
import Who from '../generics/Who.vue'
import Sources from '../generics/Sources.vue'
import Application from '../generics/Application.vue'

console.log({VariableBody})

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
