<template lang="jade">

#nominate
    heading(:content='headingContent')
    .row.container
        .four.columns.layout__sidebar
            navigation
        .eight.columns.layout__main
            variable-body(:content='variableContent')
            nomination
            hr
            #nominees
                h2 Nominees
                nominee(v-for='(nominee, i) in nominees', :nominee='nominee')
            footer-x

</template>

<script>
import VariableBody from '../generics/VariableBody.vue'
import Heading from '../generics/Heading.vue'
import FooterX from '../generics/FooterX.vue'
import Privacy from '../generics/Privacy.vue'
import Navigation from '../generics/Navigation.vue'

import Nominee from './Nominee'
import Nomination from './Nomination'

let headingContent = ['Nominate an Independent']
let variableContent = [
    'Do you know someone you trust? Someone competent and hard-working, who has a deep understanding of one or more areas of provincial activity. Someone who understands the situation in health, in education, in social services, in energy, in housing... and has the will to enact solutions. We want to know we they are.',
    'It\'s not simply saying no to the status quo, it\'s filling the legislature with motivated and intellegent people who will make an effort to improve and reform Government. We are experiencing drastic economic and demographic transitions.',
    'Do you know someone who you think should run as an independent? Then let us know and we will reach out and encourage them. Nominate them today:',
]

export default {
    data() {
        return {
            headingContent,
            variableContent,
        }
    },
    computed: {
            idea() {
                return this.$store.state.idea.content
            },
            nominees(){
                return this.$store.state.nomination.nominees
            },
        },
        components: {
            Nominee,
            Nomination,
            VariableBody,
            Heading,
            FooterX,
            Privacy,
            Navigation
        },
        beforeMount() {
            this.$store.dispatch("SET_IMAGINE_X_BY_URL", window.location.pathname)
        }
}
</script>

<style lang="stylus" scoped>
  @import "../../styles/main"
</style>
