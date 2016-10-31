<template lang="jade">

#footer
  a.footer__link Privacy Policy
  span  | 
  a.footer__link(href='mailto:hello@imagine-x.ca') Contact Us
  img.logo.logo--footer(src='../../../static/images/imaginex.svg')

</template>

<script>
export default {
    props: ['content']
}
</script>

<style lang="stylus" scoped>
  @import "../../styles/main"
</style>

