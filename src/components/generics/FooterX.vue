<template lang="jade">

#footer
  a(@click='showPrivacyModal').footer__link Privacy Policy
  span  |  
  a.footer__link(href='mailto:hello@imagine-x.ca') Contact Us
  img.logo.logo--footer(src='../../../static/images/imaginex.svg')

</template>

<script>
export default {
    props: ['content'],
    methods: {
      showPrivacyModal(){
        this.$store.dispatch('TOGGLE_PRIVACY')
      }
    }
}
</script>

<style lang="stylus" scoped>
  @import "../../styles/main"

  a
    cursor:pointer
</style>
