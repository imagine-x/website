<template lang="jade">

#nominate
    thank-you
    privacy
    heading(:content='headingContent')
    .row.container
        .four.columns.layout__sidebar.u-hide-at-sm
            navigation
            application
        .eight.columns.layout__main
            variable-body(:content='variableContent')
            div.u-align--center
              button Nominate someone today &nbsp; >
            //nomination
            hr
            #nominees
                h1 Current Nominees
                p Check out the current nominees. Endorse an existing nominees to encourage them to run for the upcoming BC provincial election.
                .row
                    .six.columns
                        label.form__label Sort by:
                        select.select
                            option Most recent
                            option Endorsements
                            option Alphabetically
                            option Region / Riding
                    .six.columns
                        label.form__label Filter by Riding/Region:
                        select.select
                            option All
                            option Riding 1
                            option Riding 2
                            option Riding 3
                            option Riding 4
                nominee(v-for='(nominee, i) in nominees', :nominee='nominee')
            footer-x

</template>

<script>
import VariableBody from '../generics/VariableBody.vue'
import Heading from '../generics/Heading.vue'
import FooterX from '../generics/FooterX.vue'
import Privacy from '../generics/Privacy.vue'
import Navigation from '../generics/Navigation.vue'
import Application from '../generics/Application.vue'
import ThankYou from '../generics/ThankYou.vue'

import Nominee from './Nominee'
import Nomination from './Nomination'

let headingContent = ['Nominate an indepedent candidate for BC']
let variableContent = [
    'Are you frustrated with the current political options in BC? Then start creating an alternative by nominating someone to run as an indepedent candidate in the upcoming BC provincial election in May 2017. Maybe that person is a friend or family member you know. Perhaps they’re a community leader, your neighbour, an old boss, your professor, your doctor, a highschool teacher, that activist in the local newspaper, that colleague at work or the small business owner down the street. Maybe that person is you.',
    'BC needs exceptional people in provincial government who put citizens first over party interests. We need new voices and talent to lead us through the challenges we face today and in the future. We need independent thinkers who truly stand for interests of British Columbians and simply good governance.',
    'Take the first step by nominating someone to run as an independent candidate. We hope that with enough public endorsement, your nominee will consider to run in the upcoming election. We will even try to contact them to encourage them to run.'
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
            Navigation,
            Application,
            ThankYou
        },
        beforeMount() {
            this.$store.dispatch("SET_IMAGINE_X_BY_URL", window.location.pathname)
        }
}
</script>

<style lang="stylus" scoped>
  @import "../../styles/main"
</style>
