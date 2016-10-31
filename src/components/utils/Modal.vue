<template lang="jade">

.modal(v-show='visible', @click='close')
  .content(@click.stop='')
      slot

</template>

<script>
export default {
  props: ['visible', 'close'],
}
</script>

<style lang='stylus' scoped>
  @import "../../styles/main"

  .modal{
    @extends .backdrop
    background-color: rgba(0,0,0,.8);
  }

  .content {
      background-color: white;
      padding: 20px;
      border: 1px solid #888;
      height: 100%;
  }

@media (min-width: smBreakpoint) {
  .content {
      margin: 15% auto;
      width: minBreakpoint;
      height: auto;
  }
}


</style>
