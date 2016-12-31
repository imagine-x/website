<template>

<Modal v-bind:visible="visible" v-bind:close="closeModal">
    <h1>Thank you for your nomination</h1>
    <p>Thank you for nominating a potential independent candidate for the upcoming BC provincial election. We will be reviewing your submission prior to publishing your nominee. Please email us at hello@imagine-x.ca if there are any errors your wish to correct in your submission.</p>
    <p>If you have provided contact information for your nomiee, we will attempt to contact them to notify them about their nomination. But don't just rely on us! Reach out to your candidate and encourage them to run.</p>
    <p>
        <a href="https://twitter.com/home?status=I%20just%20nominated%20an%20independent%20candidate%20for%20the%202017%20BC%20election.%20Check%20out%20the%20nominees%20at%20www.imagine-x.ca/nominees%20%40imaginexbc%20%23bcpoli" target="_blank">
            <span>Tweet to tell your network that you've nominated someone and maybe they will too!</span>
            <i class="fa fa-twitter"></i>
        </a>
    </p>
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
