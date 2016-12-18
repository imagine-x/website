<template lang="jade">

.modal(v-if='visible', @click='close')
  #content.content.content--sm(@click.stop='')
      a(href="#" class="modal__close-btn" @click.prevent='close') CLOSE
      slot

</template>

<script>
export default {
  props: ['visible', 'md'],
  methods: {
    close(){
      this.$store.commit('setShowDetails', false);
      document.getElementById('content').scrollTop = 0;
    }
  },
}
</script>

<style lang='stylus' scoped>
  @import "../../../styles/main";

</style>
