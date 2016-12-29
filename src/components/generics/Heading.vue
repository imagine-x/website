<template lang="jade">

#heading.container.container--header
  .four.columns.header-container
    router-link(to="/").link
      img.logo.header-container__block(
      src='../../../static/images/imaginex.svg')
    a(class="btn btn--header", href="#", @click.prevent='toggleHeaderNav') MENU
  navigation(v-show="showHeaderNav").navigation--header
  .eight.columns.header-container__block
      h1.heading__text(v-for='x in content')
        p {{ x }}


</template>

<script>
import Navigation from './Navigation'

export default {
    components: { Navigation },
    props: ['content'],
    data(){
      return {
        showHeaderNav: false,
      }
    },
    methods:{
      toggleHeaderNav(){
        this.showHeaderNav = !this.showHeaderNav
        if( this.showHeaderNav ){

        } else {

        }
      },
      next(){
        this.$store.dispatch(`CHANGE_MODE`, 'imagine')
        this.$store.dispatch('NEXT_IMAGINE_X')
      },
    },
}
</script>

<style lang="stylus" scoped>
  @import "../../styles/main"

button
  float:right

img
  cursor:pointer

.link {
    display: inline-flex;
}

.header-container
  border-bottom: 1px solid #E0E1DC;
  padding: 0;
  display: flex;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;

.header-container__block {
    padding-left: 20px;
    padding-right: 20px;
}

.btn--header {
    display: block;
    padding: 0 20px;
    height: 40px;
    margin-bottom: 0;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
    line-height: 38px;
    margin-right: 20px;
}

.container--header {
    padding-left: 0;
    padding-right: 0;
}

.navigation--header {
  display: block;
}

.heading__text {
    margin-top: 5rem;
    margin-bottom: 4rem;
}

@media (min-width: breakpoint) {
    button{
      display:none
    }

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

    .btn--header {
        display: none;
    }

    .heading__text {
        margin-top: 0;
        margin-bottom: 4rem;
    }

    .container--header {
        padding-left: 20px;
        padding-right: 20px;
    }
}
</style>
