<template lang="jade">

.variable
    p(v-for='x in content') {{ x }}

</template>

<script>
export default {
    props: ['content']
}
</script>

<style lang="stylus" scoped>
  @import "../../styles/main"

  p
    font-family: Roboto,Arial,sans-serif
    font-size: .9em


</style>
