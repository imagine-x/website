<template lang="jade">

#mainnominees
    nomination

</template>

<script>
import Nomination from './Nomination'

export default {
    computed: { },
        components: {
            Nomination
        },
        beforeMount() {
            this.$store.dispatch("SET_IMAGINE_X_BY_URL", window.location.pathname)
        }
}
</script>

<style lang="stylus" scoped>
  @import "../../styles/main"
</style>
