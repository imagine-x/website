<template lang="jade">

.variable
  h5 Our Core Values:
  table
    tbody
      tr(v-for='x in content')
        td.number {{ Object.keys(x)[0] }}
        td {{ x[Object.keys(x)[0]] }}

</template>

<script>
export default {
    props: ['content']
}
</script>

<style lang="stylus" scoped>
  @import "../../styles/main"

  table
    text-align:left
    padding-left:0%
    padding-right:5%
    font-size:.9em

  .number
    font-size: .9em
    font-weight: bolder

</style>
