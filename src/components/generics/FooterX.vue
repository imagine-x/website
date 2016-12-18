<template lang="jade">

#footer
  a(href="#", @click.prevent='showPrivacyModal').footer__link Privacy Policy
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

#footer {
    margin-top: 5rem;
}

.footer__link {
    font-size: 12px;
    margin-top: 0.75rem;
    display: inline-block;
}
</style>
