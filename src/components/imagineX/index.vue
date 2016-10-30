<template lang="jade">

main
    heading(v-bind:content='idea.heading')
    .row.container
      .eight.columns.layout__main
        variable-body(v-bind:content='idea.variable')
        b Join us and together let's create a #BetterBC.
        hr
      .four.columns.layout__sidebar
        #form
        application
        hr.hr--hide-lg
      .eight.columns.layout__main
        div(v-if='idea.main')
            values(v-bind:content='idea.values')
            hr
            who
        div(v-else)
            who
            hr
            values(v-bind:content='idea.values')
        hr
        sources(v-bind:content='idea.sources')
        hr(v-if='idea.sources.length > 0')
        footer-x

</template>

<script>
import VariableBody from '../generics/VariableBody.vue'
import Heading from './Heading.vue'
import Values from './Values'
import Who from '../generics/Who.vue'
import FooterX from '../generics/FooterX.vue'
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
      FooterX,
      Sources,
      Application,
      Values
    },
}
</script>

<style lang="stylus" scoped>
  @import "../../styles/main"

  @media (min-width: breakpoint) {
    .hr--hide-lg {
        display: none;
    }
  }
</style>
