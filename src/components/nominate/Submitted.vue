<template>

<Modal v-bind:visible="visible" v-bind:close="closeModal">
    <h1>Thank you for your nomination</h1>
    <p>Thank you for nominating a potential independent candidate for the upcoming BC provincial election. We will be reviewing your submission prior to publishing your nominee. If you have provided contact information for your nomiee, we will attempt to contact them to notify them about their nomination. But don't just rely on us! Reach out to your candidate and encourage them to run.</p>
    <button class="btn--full" @click.prevent='closeModal'>See more nominees</button>
</Modal>
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
      return this.$store.state.director.submitted
    }
  },
  methods: {
    closeModal() {
      this.$store.dispatch('TOGGLE_SUBMITTED')
    },
  },
}
</script>

<style lang='stylus' scoped>

@import "../../styles/main";

</style>
