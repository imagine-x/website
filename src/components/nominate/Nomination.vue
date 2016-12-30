<template>
<div class='application'>
  <submitted></submitted>
  <h2>Nomination Form</h2>
  <p>We're thrilled that you want to nominate someone to run in the upcoming BC provincial election as an indepedent. Fill in the form below to submit a nomination. Please do not submit names of individuals who are running on behalf of an existing political party. If you submit the nominee's contact information below, we will try reach out to them to notify them about their nomination. This nomination process is to encourage nominess to consider candidacy in the election and does not replace with any official nomination procedures required by Elections BC.</p>
  <p>Note: All fields are mandatory unless indicated as optional.</p>
  <br>
  <form class="form" id='form'>
    <fieldset>
        <legend>NOMINEE'S INFO</legend>
        <label class="form__label" for="nominee-name">Nominee's full name</label>
        <input
            type='text'
            id="nominee-name"
            name='name'
            v-model='nominee.name'
            :style="nomineeNameInputStyle"
            />
        <label class="form__label" for="nominee-occupation">Nominee's current occupation</label>
        <input
            type='text'
            id="nominee-occupation"
            name='occupation'
            v-model="nominee.occupation"
            :style="nomineeOccupationInputStyle"
            />
        <label class="form__label" for="nominee-email">Nominee's email <span class="help-text">(Optional. For contact purposes only to notify nominee. Will not be published)</span></label>
        <input
            type='email'
            name='contact'
            id="nominee-email"
            v-model='nominee.contact'
            />
        <label class="form__label" for="nominee-twitter">Nominee's Twitter handle <span class="help-text">(Optional. For contact purposes only to notify nominee. Will not be published)</span></label>
        <input
            type='text'
            name='twitter'
            id="nominee-twitter"
            v-model='nominee.twitter' />
        <label class="form__label" for="region">Location where nominee should run / is running</label>
        <select id="location"
            class="select"
            v-model="nominee.location"
            :style="nomineeLocationInputStyle"
        >
            <optgroup label="Region">
                <option v-for="r in regions">{{ r }}</option>
            </optgroup>
            <optgroup label="Riding">
                <option v-for="r in ridings">{{ r }}</option>
            </optgroup>
        </select>
        <label class="form__label" for="whybox">Tell us why the nominee would be a good candidate <span class="help-text">(Max 600 characters)</span></label>
        <textarea
            class="why-area"
            rows="5"
            id="whybox"
            name="why"
            maxlength="600"
            v-model="nominee.why"
            :style="nomineeWhyInputStyle"
            />
        <label class="form__label" for="nominee-link">Link to more information about nominee<span class="help-text"> (Optional. This can be a link to a wikipedia entry, a news article, writing or a biography of the nominee. Link must start with http:// or https://)</span></label>
        <input
            type="url" id="nominee-link"
            name='link'
            v-model="nominee.link"
            :style="nomineeLinkInputStyle"
        />
        <input
            type="checkbox"
            id="official-status"
            v-model="nominee.official"/>
        <label for="official-status" class="checkbox__label">Nominee is officially registered with Elections BC<span class="help-text"> (Optional)</span></label>
    </fieldset>

    <br>
    <fieldset>
        <legend>YOUR INFO<span class="help-text"> (Will not be published)</span></legend>
        <label class="form__label" for="your-name">Your full name</label>
        <input
              type='text'
              id="your-name"
              name='yourname'
              v-model="submitter.name"
              :style="submitterNameInputStyle"
              />
        <label class="form__label" for="your-email">Your email <span class="help-text"> (For contact purposes only. Will not be published)</span></label>
        <input
              type='email'
              name='yourmail'
              id="your-email"
              v-model="submitter.mail"
              :style="submitterMailInputStyle"
              ></input>
        <label class="form__label" for="your-postal">Your postal code <span class="help-text"> (Will not be published)</span></label>
        <input
              type='text'
              id="your-postal"
              name='yourpostal'
              v-model="submitter.postal"
              :style="submitterPostalInputStyle"
              />
        <input type="checkbox" id="tou" v-model="submitter.terms" rquired/>
        <label for="tou" class="checkbox__label">Yes, I accept the
            <a href="#" @click.prevent="showTouModal">Terms of Use</a>
            <span class="required-checkbox" :style="submitterTouInputStyle"> &#8656; REQUIRED </span>
        </label>
        <br/>
        <input type="checkbox" id="mail-list" v-model="submitter.list"/>
        <label for="mail-list" class="checkbox__label">Yes, I want to subscribe to the Imagine X mailing list for updates</label>
    </fieldset>
    <br>
    <button
        :class='buttonStatus.btnClass'
        @click.prevent='nominate'>
          {{buttonStatus.btnMessage}}
      </button>
  </form>
</div>
</template>

<script>
import request from 'superagent'
import _ from 'lodash'
import Submitted from './Submitted'
import { regions, ridings } from '../../assets/locationData'

const invalidStyle = {
  'border-color': '#da0505',
}

const validStyle = {
  'border-color': '',
}

let emptyNominee = {
  name: '',
  occupation: '',
  location: '',
  contact: '',
  twitter: '@',
  link: '',
  official: false,
  why: '',
}

let emptySubmitter = {
  name: '',
  mail: '',
  postal: '',
  terms:false,
  list:false,
}

export default {
  components: {
    Submitted
  },
  props: ['content'],
  data() {
    return {
      submitAttempted:false,
      success: false,
      regions,
      ridings,
      nominee: _.clone(emptyNominee),
      submitter: _.clone(emptySubmitter),
    }
  },
  methods: {
    nominate() {
      this.submitAttempted = true
      if ( this.isValid() ){
        let info = {
          nominee: this.nominee,
          submitter: this.submitter
        }
        request
          .post('/nomination')
          .send(info)
          .then(console.log)
          .catch(console.log)

        this.nominee = _.clone(emptyNominee)
        this.submitter = _.clone(emptySubmitter)
        this.$store.dispatch('TOGGLE_THANKYOU')
        this.$router.push('/gallery')
        this.$store.commit('newNominee', this.nominee)
        this.submitAttempted = false
      }
    },
    showTouModal(){
      this.$store.dispatch('TOGGLE_TOU')
    },
    isValid(){
        return( this.isValidSubmitterInfo() && this.isValidNomineeInfo() )
    },
    isValidNomineeInfo(){
      this.nominee.name = this.nominee.name.replace(/^\s/, '')
      this.nominee.occupation = this.nominee.occupation.replace(/^\s/, '')
      return (
        this.isValidNomineeName() &&
        this.isValidNomineeOccupation() &&
        this.isValidNomineeLocation() &&
        this.isValidNomineeWhy() &&
        this.isValidNomineeLink()
      )
    },
    isValidNomineeName() {
      return this.nominee.name.length > 3
    },
    isValidNomineeOccupation() {
      return this.nominee.occupation.length > 3
    },
    isValidNomineeLink() {
        if (this.nominee.link.length > 0) {
            let urlRegex = /https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}/
            return urlRegex.test(this.nominee.link)
        } else {
            return true
        }
    },
    isValidNomineeLocation() {
      return this.nominee.location
    },
    isValidNomineeWhy() {
      return this.nominee.why.length > 30
    },
    isValidSubmitterInfo() {
			this.submitter.name = this.submitter.name.replace(/^\s/, '')
			this.submitter.mail = this.submitter.mail.replace(/\s/, '')
			this.submitter.postal = this.submitter.postal.replace(/\s/, '')
      return (
        this.isValidSubmitterName() &&
        this.isValidSubmitterMail() &&
        this.isSubmitterTouAccepted()
      )
    },
    isValidSubmitterName() {
      return this.submitter.name.length > 3
    },
    isValidSubmitterMail() {
      let mailRegex = /^\w+\.?\w+?\@\w+\.(\w+\.)?\w+$/
      return mailRegex.test(this.submitter.mail)
    },
    isValidSubmitterPostal() {
      let postalRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/
      return postalRegex.test(this.submitter.postal)
    },
    isSubmitterTouAccepted() {
      return this.submitter.terms
    }
  },
  computed:{
    nomineeNameInputStyle(){
      if (this.submitAttempted) {
        if (this.isValidNomineeName()) {
          return validStyle
        }
        return invalidStyle
      }
    },
    nomineeOccupationInputStyle(){
      if (this.submitAttempted) {
        if (this.isValidNomineeOccupation()) {
          return validStyle
        }
        return invalidStyle
      }
    },
    nomineeLocationInputStyle(){
      if (this.submitAttempted) {
        if (this.isValidNomineeLocation()) {
          return validStyle
        }
        return invalidStyle
      }
    },
    nomineeWhyInputStyle(){
      if (this.submitAttempted) {
        if (this.isValidNomineeWhy()) {
          return validStyle
        }
        return invalidStyle
      }
    },
    nomineeLinkInputStyle(){
      if (this.submitAttempted) {
        if (this.isValidNomineeLink()) {
          return validStyle
        }
        return invalidStyle
      }
    },
    submitterNameInputStyle() {
      if (this.submitAttempted) {
        if (this.isValidSubmitterName()) {
          return validStyle
        }
        return invalidStyle
      }
    },
    submitterMailInputStyle(){
      if (this.submitAttempted) {
        if (this.isValidSubmitterMail()) {
          return validStyle
        }
        return invalidStyle
      }
    },
    submitterPostalInputStyle(){
      if (this.submitAttempted) {
        if (this.isValidSubmitterPostal()) {
          return validStyle
        }
        return invalidStyle
      }
    },
    submitterTouInputStyle(){
      if (this.submitAttempted) {
        if (!this.submitter.terms) {
          return { display: 'inline' }
        }
      }
    },
    buttonStatus(){
      if (this.submitAttempted && !this.isValid()){
        return {
          btnClass:{
            invalidbtn:true
          },
          btnMessage:"invalid"
        }
      }
      if (this.success){
        return {
          btnClass:{
            successBtn:true
          },
          btnMessage:"thank you"
        }
      }
      return {
        btnMessage: 'submit'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../styles/main"
.why-area {
    height: 18rem;
}

.invalidbtn
    background-color:red

.successbtn
    background-color:green

.required-checkbox
    font-size:.8em
    color:red
    display:none

</style>
