<template>
<Modal v-bind:visible="visible" v-bind:close="closeModal">
  <h1>Sign Up / Sign In to Endorse</h1>
  <p>Let's publically show our collective support for our favourite nominees to encourage them to run. If we can, we'll even try to reach out to the nominee and let them know about the public support for their nomination. Sign up for an account or sign in
    to endorse nominees. </p>
    <label class="form__label" for="login-name" >Your Name</label>
    <input
        type="text"
        id="login-name"
        v-model="info.name"
        :style="nameInputStyle"/>
    <label class="form__label" for="login-email">Your Email</label>
    <input
        type="email"
        id="login-email"
        v-model="info.mail"
        :style="mailInputStyle" />
    <label class="form__label" for="login-pw">Your Postal Code
      <span class="help-text"> (This is your password)</span>
      <span :style="touInputStyle"> &#8656; REQUIRED </span>
    </label>
    <input
        type="text"
        id="login-pw"
        v-model="info.postal"
        :style="postalInputStyle" />
    <input type="checkbox" id="tou" v-model="info.tou" />
    <label for="tou" class="checkbox__label">Yes, I accept the
       <a href="#" @click.prevent="showTouModal">Terms of Use</a>
       <span class="required-checkbox" :style="touInputStyle"> &#8656; REQUIRED </span>
     </label>
     <br/>
     <input type="checkbox" id="mail-list" v-model="info.list" />
     <label for="mail-list" class="checkbox__label">
       Yes, I want to subscribe to the Imagine X mailing list
     </label>
     <button class="btn--full u-margin--top" @click.prevent='login'>
       Sign in & Endorse nominee
     </button>
</Modal>
</template>

<script>
import Modal from '../utils/Modal.vue'
import request from 'superagent'
import _ from 'lodash'
const invalidStyle = {
  'border-color': '#da0505',
}
const validStyle = {
  'border-color': '',
}
export default {
  data() {
    return {
      submitAttempted:false,
      info: {
        name: '',
        mail: '',
        postal: '',
        list: false,
        tou: false
      }
    }
  },
  components: {
    Modal
  },
  methods: {
    closeModal() {
      this.$store.dispatch('TOGGLE_ENDORSE')
    },
    showTouModal() {
      this.$store.dispatch('TOGGLE_TOU')
    },
    login() {
      this.submitAttempted = true
      if (this.isValidInfo()) {
        request.post('/login').send(this.info).then(console.log).catch(console.log)
          // TODO handle in response from serve
        this.$store.commit('login', this.info.mail)
        this.closeModal()
      }
    },
    isValidInfo() {
      this.info.name = this.info.name.replace(/^\s/, '')
      this.info.mail = this.info.mail.replace(/\s/, '')
      this.info.postal = this.info.postal.replace(/\s/, '')
      return (
          this.isValidName() &&
          this.isValidMail() &&
          this.isValidPostal() &&
          this.info.tou
        )
    },
    isValidName() {
      return this.info.name.length > 3
    },
    isValidMail() {
      let mailRegex = /^\w+\.?\w+?\@\w+\.(\w+\.)?\w+$/
      return mailRegex.test(this.info.mail)
    },
    isValidPostal() {
      let postalRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/
      return postalRegex.test(this.info.postal)
    },
  },
  computed: {
    visible() {
      return this.$store.state.director.endorse
    },
    nameInputStyle() {
      if (this.submitAttempted) {
        if (this.isValidName()) {
          return validStyle
        }
        return invalidStyle
      }
    },
    mailInputStyle() {
      if (this.submitAttempted) {
        if (this.isValidMail()) {
          return validStyle
        }
        return invalidStyle
      }
    },
    postalInputStyle() {
      if (this.submitAttempted) {
        if (this.isValidPostal()) {
          return validStyle
        }
        return invalidStyle
      }
    },
    touInputStyle(){
      if (this.submitAttempted) {
        if (!this.info.tou) {
          return { display: 'inline' }
        }
      }
      return { display: 'none' }
    },
    buttonStatus() {
      if (this.info.submitAttempted && !this.isValidInfo()) {
        return {
          btnClass: {
            invalidbtn: true
          },
          btnMessage: "invalid"
        }
      }
      if (this.info.success) {
        return {
          btnClass: {
            successBtn: true
          },
          btnMessage: "thank you"
        }
      }
      return {
        btnMessage: 'learn more'
      }
    }
  }
}
</script>

<style lang='stylus' scoped>

@import "../../styles/main";
.required-checkbox
    font-size:.8em
    color:red
    display:none

</style>
