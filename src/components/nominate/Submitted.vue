<template>

<Modal v-bind:visible="visible" v-bind:close="closeModal">
    <h1>Thank you for your nomination</h1>
    <p>Thank you for nominating a potential independent candidate. We will be reviewing your submission prior to publishing your candidate. If you have provided contact information for your nomiee, we will contact them to notify them about their nomination. But don't just rely on us! Reach out to your candidate and encourage them to run.</p>
    <button class="btn--full" @click.prevent='closeModal'>See more nominees</button>
</Modal>
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

@import "../../styles/main";

</style>
