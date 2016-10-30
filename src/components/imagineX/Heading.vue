<template lang="jade">

#heading.container.container--header
  .four.columns.header-container
    img.logo.header-container__block(
      src='../../../static/images/imaginex.svg',
      @click='next'
      )
    a.btn.btn--header.header-container__block(href="#form") Take Action
  .eight.columns.header-container__block
      h1.heading__text(v-for='x in content')
        {{ x }}

</template>

<script>
export default {
    props: ['content'],
    methods:{
      next(){
        this.$store.dispatch('NEXT_IMAGINE_X')
      },
    },
}
</script>

<style lang="stylus" scoped>
  @import "../../styles/main"
img
  cursor:pointer

.header-container
  border-bottom: 1px solid #E0E1DC;
  padding: 2rem 0;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

.header-container__block {
    padding-left: 20px;
    padding-right: 20px;
}

.btn--header {
    display: none;
}

.container--header {
    padding-left: 0;
    padding-right: 0;
}


@media (min-width: 390px) {
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
