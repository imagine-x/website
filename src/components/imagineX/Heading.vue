<template lang="jade">

#heading.container.container--header
  .four.columns.header-container
    img.logo.header-container__block(
      src='../../../static/images/imaginex.svg',
      @click='next'
      )
    a.btn.btn--header.header-container__block(href="#") MENU
  navigation(className="navigation--offcanvas")
  .eight.columns.header-container__block.header-container__block--text
      h1.heading__text(v-for='x in content')
        {{ x }}

</template>

<script>
import Navigation from './Navigation.vue'

export default {
    props: ['content'],
    methods:{
      next(){
        this.$store.dispatch('NEXT_IMAGINE_X')
      },
    },
    components: {
        Navigation
    }
}
</script>

<style lang="stylus" scoped>
  @import "../../styles/main"
img
  cursor:pointer

.header-container
  border-bottom: 1px solid #E0E1DC;
  padding: 2rem 0;
  display: flex;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.65rem;

.header-container__block {
    padding-left: 20px;
    padding-right: 20px;
}

.header-container__block--text {
    margin-top: 5rem;
}

.btn--header {
    display: block;
    background: white;
    color: black;
    border: 3px solid black;
    padding: 0 10px;
    height: 26px;
    margin-bottom: 0;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
    line-height: 26px;
    margin-right: 20px;
    font-size: 14px;
}

.container--header {
    padding-left: 0;
    padding-right: 0;
}

@media (min-width: breakpoint) {
    #heading {
        margin-top: 10rem;
    }

    .header-container {
        border-bottom: 0;
        padding: 0;
        margin-bottom: 7rem;
        display: block;
    }

    .header-container__block {
        padding-left: 0;
        padding-right: 0;
    }

    .header-container__block--text {
        margin-top: 0;
    }

    .btn--header {
        display: none;
    }

    .heading__text {
        margin-bottom: 4rem;
    }

    .container--header {
        padding-left: 20px;
        padding-right: 20px;
    }
}
</style>
