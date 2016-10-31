<template lang="jade">



.application
	form
		label TAKE ACTION
		p Add your name to learn more.
		div
			input(
				type='text',
				placeholder='Your Name',
				name='name',
				v-model='name',
		    v-bind:style='nameInputStyle'
			)
		div
			input(
				type='text',
				placeholder='Your Email',
				name='mail',
				v-model='mail',
		    v-bind:style='mailInputStyle'
			)
		div
			input(
				type='text',
				placeholder='Postal Code',
				name='postal',
				v-model='postal'
		    v-bind:style='postalInputStyle'
			)
		.checkbox-container
			input(type="checkbox", name="subscribe", id="subscribe", v-model='subscribe')
			label.checkbox__label(for="subscribe") Yes, I’d like to receive updates
		button.btn.btn--full(@click.prevent='postInfo') Learn more



</template>

<script>
import request from 'superagent'
import _ from 'lodash'

const invalidStyle = {
  'border-color': 'darkRed',
}

const validStyle = {
  'border-color': 'darkGreen',
}

export default {
  data() {
    return {
      name: '',
      mail: '',
      postal: '',
      subscribe: true,
      submitAttempted: false,
    }
  },
  props: ['content'],
  methods: {
    postInfo() {
      this.submitAttempted = true
      if (this.isValidInfo()) {
        let info = _.pick(this, ['name', 'mail', 'postal', 'subscribe'])
        request
          .post('/post')
          .send(info)
          .then(console.log)
          .catch(console.log)
        //reset
        this.submitAttempted = false
        this.name = ''
        this.mail = ''
        this.postInfo = ''
				this.$store.dispatch('TOGGLE_THANKYOU')
      }
      console.log('invalid')
    },
    isValidInfo() {
      return (
        this.isValidName() &&
        this.isValidMail()
      )
    },
    isValidName() {
      return this.name.length > 3
    },
    isValidMail() {
      let mailRegex =
        /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
      return mailRegex.test(this.mail)
    },
    isValidPostal() {
      let postalRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/
      return postalRegex.test(this.postal)
    },
  },
  computed: {
    nameInputStyle() {
      if (this.submitAttempted) {
        if (this.isValidName()) {
          return validStyle
        }
        return invalidStyle
      }
    },
    mailInputStyle(){
      if (this.submitAttempted) {
        if (this.isValidMail()) {
          return validStyle
        }
        return invalidStyle
      }
    },
    postalInputStyle(){
      if (this.submitAttempted) {
        if (this.isValidPostal()) {
          return validStyle
        }
        return invalidStyle
      }
    },

  }
}
</script>

<style lang="stylus" scoped>
  @import "../../styles/main"

  input!important // prevent webkit yellow
    background-color: white

  @media (min-width: smBreakpoint) {
    .application {
        width: 50%;
    }
  }

  @media (min-width: breakpoint) {
    .application {
        width: 100%;
    }
  }
</style>
