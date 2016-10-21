<template lang="jade">
#who
  h2 Who Are We?
  p Imagine X is a group of passionate citizens starting a political movement for a better BC. We stand for a good government that meets our core values of: Transparency, Evidence-Based Decision-Making, Citizen-Centric, Empathy, Collaboration, Sustainability, Forward-Thinking, and Fun. And no, we’re not affiliated with the BC Liberals, BC NDPs, Greens, or any other party. We simply want a better government for a better BC - just like you. Sign up to support us and keep up-to-date on our next steps.
  img(
    v-bind:src='imaginexLocation',
  )
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
    font-family: Montserrat,Arial,sans-serif;
    font-size: 18px;
    padding: 0.5rem 0;
    margin-bottom: 0.5rem;


</style>
