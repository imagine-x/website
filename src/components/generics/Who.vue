<template lang="jade">
#who
  h6 WHO WE ARE
  p Imagine X is a political platform. We are a group of passionate citizens starting a political movement for a better BC. We stand for a good government with principles and policies that meet our core values. And no, we are not affiliated with the BC Liberals, NDPs, Greens, any other party or interest group. We simply want a better government for a better BC - just like you.
</template>

<script>
export default {
  computed: {
    imaginexLocation: function(){
      if (this.$store.state.director.mode==="attack"){
        return '../../../static/images/imaginexWhite.svg'
      }
      return '../../../static/images/imaginex.svg'
    }
  }
}

</script>

<style lang="stylus" scoped>
  @import "../../styles/main"

  span
    color: yellow

  h2
    font-weight:bolder
    padding: 0.5rem 0;
    margin-bottom: 0.5rem;


</style>
