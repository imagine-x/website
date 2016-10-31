<template lang="jade">


Modal(v-bind:visible='visible', v-bind:close='closeModal')
	p Ask not what your country can do for you, ask what you can do for your country.
	button(@click.prevent='closeModal') OK


</template>

<script>
import Modal from '../utils/Modal.vue'

export default {
  components: {
    Modal
  },
  computed: {
    visible() {
      return this.$store.state.director.thankYou
    }
  },
  methods: {
    closeModal() {
      this.$store.dispatch('TOGGLE_THANKYOU')
    },
  },
}
</script>

<style lang='stylus' scoped>

@import "../../styles/main"

button {
  @extends .solidBtn;
  margin-top: 48px;
  width: 100%;
  font-weight: 700;
}
</style>
