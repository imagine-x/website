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
            router-view
            footer-x

</template>

<script>
import Heading from '../generics/Heading.vue'
import FooterX from '../generics/FooterX.vue'
import Privacy from '../generics/Privacy.vue'
import Navigation from '../generics/Navigation.vue'
import Application from '../generics/Application.vue'
import ThankYou from '../generics/ThankYou.vue'

let headingContent = ['Nominate an Independent Candidate for BC']

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
