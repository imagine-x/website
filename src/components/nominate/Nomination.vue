<template>
<div class='application'>
  <submitted></submitted>
  <p>We're thrilled that you want to nominate someone to run in the upcoming BC provincial election as an indepedent. Fill in the form below to submit a nomination. Please do not submit names of individuals who are running on behalf of an existing political party. If you submit the nominee's contact information below, we will reach out to them to notify them about their nomination. This nomination process is to encourage nominess to consider candidacy in the election and does not replace with any official nomination procedures required by Elections BC.</p>
  <form class="form" id='form'>
    <fieldset>
        <legend>NOMINEE'S INFO</legend>
        <label class="form__label" for="nominee-name">Nominee's full name</label>
        <input type='text' id="nominee-name" name='name' v-model='nominee.name' required/>
        <label class="form__label" for="nominee-occupation">Nominee's current occupation</label>
        <input type='text' id="nominee-occupation" name='occupation' v-model="nominee.occupation" required/>
        <label class="form__label" for="nominee-email">Nominee's email <span class="help-text">(Optional. For contact purposes only to notify nominee. Will not be published)</span></label>
        <input type='email' name='contact' id="nominee-email" v-model='nominee.contact' />
        <label class="form__label" for="nominee-twitter">Nominee's Twitter handle <span class="help-text">(Optional. For contact purposes only to notify nominee. Will not be published)</span></label>
        <input type='text' name='twitter' id="nominee-twitter" v-model='nominee.twitter' />
        <label class="form__label" for="region">Region where nominee should run / is running</label>
        <select id="region" class="select" v-model="nominee.region" required>
            <option></option>
            <option v-for="r in regions">{{ r }}</option>
        </select>
        <label class="form__label" for="riding">Riding where nominee should run / is running <span class="help-text"> (Optional)</span></label>
        <select id="riding" class="select" v-model="nominee.riding">
            <option></option>
            <option v-for="r in ridings">{{ r }}</option>
        </select>
        <label class="form__label" for="whybox">Tell us why the nominee would be a good candidate <span class="help-text">(Max 600 characters)</span></label>
        <textarea class="why-area" rows="5" id="whybox" name="why" maxlength="600" v-model="nominee.why" required></textarea>
        <label class="form__label" for="nominee-link">Link to more information about nominee<span class="help-text"> (Optional. This can be a link to a wikipedia entry, a news article, writing or a biography of the nominee)</span></label>
        <input pattern="https?://.+" type="url" id="nominee-link" name='link' v-model="nominee.link"/>
        <input type="checkbox" id="official-status" v-model="nominee.official"/>
        <label for="official-status" class="checkbox__label">Nominee is officially registered with Elections BC<span class="help-text"> (Optional)</span></label>
    </fieldset>

    <br>
    <fieldset>
        <legend>YOUR INFO<span class="help-text"> (Will not be published)</span></legend>
        <label class="form__label" for="your-name">Your full name</label>
        <input type='text' id="your-name" name='yourname' v-model="submitter.name" required/>
        <label class="form__label" for="your-email">Your email <span class="help-text"> (For contact purposes only. Will not be published)</span></label>
        <input type='email' name='yourmail' id="your-email" v-model="submitter.mail" required></input>
        <label class="form__label" for="your-postal">Your postal code <span class="help-text"> (Will not be published)</span></label>
        <input type='text' id="your-postal" name='yourpostal' v-model="submitter.postal" required/>
        <input type="checkbox" id="tou" v-model="submitter.terms" rquired/>
        <label for="tou" class="checkbox__label">Yes, I accept the  <a href="#" @click.prevent="showTouModal">Terms of Use</a></label>
        <br/>
        <input type="checkbox" id="mail-list" v-model="submitter.list"/>
        <label for="mail-list" class="checkbox__label">Yes, I want to subscribe to the Imagine X mailing list for updates</label>
    </fieldset>
    <br>
    <button class="btn" @click='nominate'>Submit</button>
  </form>
</div>
</template>

<script>
import request from 'superagent'
import _ from 'lodash'
import Submitted from './Submitted'
import { regions, ridings } from './data'

const invalidStyle = {
  'border-color': '#da0505',
}

const validStyle = {
  'border-color': '',
}

export default {
  data() {
    return {
      regions,
      ridings,
      nominee: {
        name: '',
        occupation: '',
        region: '',
        riding: '',
        contact: '',
        twitter: '@',
        link: '',
        official: false,
        why: '',
      },
      submitter: {
        name: '',
        mail: '',
        postal: '',
        terms:false,
        list:false,
      },
      submitAttempted: false,
      success: false,
    }
  },
  props: ['content'],
  methods: {
    nominate() {
      this.$store.commit('newNominee', this.nominee)
    },
    showTouModal(){
      this.$store.dispatch('TOGGLE_TOU')
    }
  },
  components: {
    Submitted
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

</style>
