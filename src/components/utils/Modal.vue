<template lang="jade">

.modal(v-show='visible', @click='close')
  .content(v-bind:class='contentClass', @click.stop='')
      button.modal__close-btn(@click='close') x
      slot

</template>

<script>
export default {
  props: ['visible', 'close', 'md'],
  computed: {
    contentClass(){
      if (this.md){
        return {
          "content--md": true
        }
      }
      return {}
    }
  }
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

  .modal__close-btn {
    border: 3px solid black;
    background: white;
    color: black;
    padding: 1.25rem 0.75rem;
    height: auto;
    line-height: 0;
    float: right;
  }

  .modal__close-btn:hover {
    background: black;
    color: white;
  }

@media (min-width: smBreakpoint) {
  .content {
      margin: 15% auto;
      width: minBreakpoint;
      height: auto;
  }

  .content.content--md {
    margin: 5% auto;
    width: 85%;
  }
}


</style>
