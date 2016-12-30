<template lang="jade">

#mainnominees
    variable-body(:content='variableContent')
    div.u-align--center
      router-link(to="nominate/form")
        button Nominate now &nbsp; >
    hr
    nominees

</template>

<script>
import VariableBody from '../generics/VariableBody.vue'
import Nominees from './Nominees'

let variableContent = [
    'Are you frustrated with the current political options in BC? Then let\'s start creating an alternative by nominating someone to run as an indepedent candidate in the upcoming BC provincial election in May 2017. Maybe that person is a friend or family member you know. Perhaps they’re a community leader, your neighbour, an old boss, your professor, your doctor, a highschool teacher, that activist in the local newspaper, that colleague at work or the small business owner down the street. Maybe that person is you.',
    'BC needs exceptional people in provincial government who put citizens first over party interests. We need new voices and talent to lead us through the challenges we face today and in the future. We need independent thinkers who truly stand for interests of British Columbians and simply good governance.',
    'Take the first step by nominating someone to run as an independent candidate. We hope that with enough public endorsements, your nominee will consider to run in the upcoming election. If we can, we\'ll even try to reach out to the nominee and let them know about the public support for their nomination.'
]

export default {
    data() {
        return {
            variableContent,
        }
    },
    computed: { },
        components: {
            Nominees,
            VariableBody,
        },
        beforeMount() {
            this.$store.dispatch("SET_IMAGINE_X_BY_URL", window.location.pathname)
        }
}
</script>

<style lang="stylus" scoped>
  @import "../../styles/main"
</style>
