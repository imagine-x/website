<template>

<Modal v-bind:visible="visible" v-bind:close="closeModal">
    <h1>Sign Up / Sign In to Endorse</h1>
    <p>Sign up for an account or sign in to endorse nominees.</p>
    <label class="form__label" for="login-email">Your Email</label>
    <input type="email" id="login-email"/>
    <label class="form__label" for="login-pw">Your Postal Code <span class="help-text">(This is your password)</span></label>
    <input type="text" id="login-pw"/>
    <input type="checkbox" id="tou"/>
    <label for="tou" class="checkbox__label">Yes, I accept the <a href="#" @click.prevent="showTouModal">Terms of Use</a></label>
    <br/>
    <input type="checkbox" id="mail-list"/>
    <label for="mail-list" class="checkbox__label">Yes, I want to subscribe to the Imagine X mailing list for updates</label>
    <button class="btn--full" @click.prevent='closeModal'>Sign in & Endorse nominee</button>
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
    showTouModal(){
      this.$store.dispatch('TOGGLE_TOU')
    }
  },
}
</script>

<style lang='stylus' scoped>

@import "../../styles/main";

</style>
