<template lang="jade">

.variable
  h6 OUR CORE VALUES
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
</style>
