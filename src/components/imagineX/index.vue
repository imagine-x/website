<template lang="jade">

main
    heading(v-bind:content='idea.heading')
    .row.container
      .eight.columns.layout__main
        variable-body(v-bind:content='idea.variable')
        b Join us and together let's imagine a #BetterBC.
        hr
      .four.columns.layout__sidebar
        application
        hr.hr--hide-lg
      .eight.columns.layout__main
        values(v-bind:content='idea.values')
        hr
        who
        hr
        #footer
          a.footer__link Privacy Policy
          span  | 
          a.footer__link Contact Us
          img.logo.logo--footer(src='../../../static/images/imaginex.svg')

</template>

<script>
import VariableBody from '../generics/VariableBody.vue'
import Heading from './Heading.vue'
import Values from './Values'
import Who from '../generics/Who.vue'
import Footer from '../generics/Footer.vue'
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
      Footer,
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
