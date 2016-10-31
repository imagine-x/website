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
    border-radius: 6%
  }

  .content {
      background-color: rgba(255,255,255,1);
      margin: 15% auto; /* 15% from the top and centered */
      padding: 20px;
      border: 1px solid #888;
      border-radius: 6%;
      width: 440px; /* Could be more or less, depending on screen size */
  }


</style>
