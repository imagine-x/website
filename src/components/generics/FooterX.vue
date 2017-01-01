<template lang="jade">

#footer
  div.footer__link-container
    a(href="#", @click.prevent='showPrivacyModal').footer__link Privacy Policy
    span  |  
    a(href="#", @click.prevent="showTouModal").footer__link Terms of Use
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
      },
      showTouModal(){
        this.$store.dispatch('TOGGLE_TOU')
      }
    }
}
</script>

<style lang="stylus" scoped>
  @import "../../styles/main"

#footer {
    margin-top: 5rem;
    padding: 5rem 0 6rem 0;
    border-top: 1px solid lightgray;
}

.footer__link-container {
  text-align: center;
}

.footer__link {
    font-size: 14px;
    margin-top: 0.75rem;
    display: inline-block;
}

.logo--footer {
    margin: 0 auto;
    display: block;
    margin-top: 4rem;
}

@media (min-width: breakpoint) {
  #footer {
    margin-bottom: 5rem;
  }
  .footer__link-container {
    text-align: initial;
  }
  .logo--footer {
    display: inline-block;
    float: right;
    margin-top: 0;
  }
}
</style>
