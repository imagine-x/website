<template lang="jade">

#nominate
    submitted
    thank-you
    endorse
    terms-of-use
    privacy
    heading(:content='headingContent')
    .row.container
        .four.columns.layout__sidebar.u-hide-at-sm
            navigation
            application
        .eight.columns.layout__main
            nominees
            footer-x

</template>

<script>
import Nominees from './Nominees'
import Heading from '../generics/Heading.vue'
import FooterX from '../generics/FooterX.vue'
import Privacy from '../generics/Privacy.vue'
import Navigation from '../generics/Navigation.vue'
import Application from '../generics/Application.vue'
import ThankYou from '../generics/ThankYou.vue'
import TermsOfUse from '../generics/TermsOfUse.vue'
import Endorse from './Endorse.vue'
import Submitted from '../nominate/Submitted.vue'

let headingContent = ['Independent Nominees Gallery']

export default {
    data() {
        return {
            headingContent,
        }
    },
    computed: {  },
        components: {
            Heading,
            FooterX,
            Privacy,
            Navigation,
            Application,
            ThankYou,
            TermsOfUse,
            Nominees,
            Endorse,
            Submitted
        },
        beforeMount() {
            this.$store.dispatch("SET_IMAGINE_X_BY_URL", window.location.pathname)
        }
}
</script>

<style lang="stylus" scoped>
  @import "../../styles/main"
</style>
