<template lang="jade">

.variable
  h5 Our Core Values:
  div(v-for='x in content')
    label{{ Object.keys(x)[0] }}
    p{{ x[Object.keys(x)[0]] }}

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
