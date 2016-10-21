<template lang="jade">

main
  .container
    heading(v-bind:content='idea.heading')
    hr
    variable-body(v-bind:content='idea.variable')
    sources(v-bind:content='idea.sources')
    hr
    who

</template>

<script>
// import { Who } from '../attackAds/Who.vue'

import VariableBody from './VariableBody.vue'
import Heading from './Heading.vue'
import Who from '../generics/Who.vue'
import Sources from '../generics/Sources.vue'

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
      Sources
    },
}

</script>

<style lang="stylus" scoped>
  @import "../../styles/main"

  hr
    border-top:1px solid black;



</style>
