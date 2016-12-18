<template>
<div class='application'>
  <h1>Nomination Form</h1>
  <p>We're thrilled that you want to nominate someone to run in the upcoming BC provincial election as an indepedent. Fill in the form below to submit a nomination. Please do not submit names of individuals who are running on behalf of an existing party. If you submit the nominee's contact information below, we will reach out to them to notify them about their nomination. This nomination process is to encourage nominess to consider candidacy in the election and does not replace with any nomination procedures required by Elections BC.</p>
  <form class="form" id='form'>
    <fieldset>
        <legend>NOMINEE'S INFO</legend>
        <label class="form__label" for="nominee-name">Nominee's full name</label>
        <input type='text' id="nominee-name" name='name' v-model='nominee.name' v-bind:style='nameInputStyle'/>
        <label class="form__label" for="nominee-occupation">Nominee's current occupation</label>
        <input type='text' id="nominee-occupation" name='occupation'/>
        <label class="form__label" for="nominee-email">Nominee's email <span class="help-text">(Optional. For contact purposes only to notify nominee. Will not be published)</span></label>
        <input type='email' name='mail' id="nominee-email" v-model='nominee.contact' v-bind:style='mailInputStyle'/>
        <label class="form__label" for="region">Region where nominee should run</label>
        <select id="region" class="select">
            <option></option>
            <option>Region 1</option>
            <option>Region 2</option>
            <option>Region 3</option>
        </select>
        <label class="form__label" for="riding">Riding where nominee should run<span class="help-text"> (Optional)</span></label>
        <select id="riding" class="select">
            <option></option>
            <option>Riding 1</option>
            <option>Riding 2</option>
            <option>Riding 3</option>
        </select>
        <label class="form__label" for="whybox">Tell us why the nominee would be a good candidate <span class="help-text">(Max 600 characters)</span></label>
        <textarea class="why-area" rows="5" id="whybox" name="why" maxlength="600" v-model='nominee.why'></textarea>
        <label class="form__label" for="nominee-link">Link to more information about nominee<span class="help-text"> (Optional. This can be a link to a wikipedia entry, a news article, writing or a biography of the nominee)</span></label>
        <input type='text' id="nominee-link" name='link'/>
    </fieldset>

    <fieldset>
        <legend>YOUR INFO<span class="help-text"> (Will not be published)</span></legend>
        <label class="form__label" for="your-name">Your full name</label>
        <input type='text' id="your-name" name='yourname'/>
        <label class="form__label" for="your-email">Your email <span class="help-text"> (For contact purposes only. Will not be published)</span></label>
        <input type='email' name='yourmail' id="your-email"></input>
        <label class="form__label" for="your-postal">Your postal code <span class="help-text"> (Will not be published)</span></label>
        <input type='text' id="your-postal" name='yourpostal'/>
        <input type="checkbox" id="tou"/>
        <label for="tou" class="checkbox__label">Yes, I accept the <a href="#">Terms of Use</a></label>
        <br/>
        <input type="checkbox" id="mail-list"/>
        <label for="mail-list" class="checkbox__label">Yes, I want to subscribe to the mailing list for occasional updates.</label>
    </fieldset>
        <!-- <input type='text' placeholder='Your Name' name='your' v-model='info.name' v-bind:style='nameInputStyle'></input>
        <input type='text' name='mail' placeholder='Your Email' v-model='info.contact' v-bind:style='mailInputStyle'></input> -->
    <button class="btn" @click.prevent='nominate'>Submit</button>
  </form>
</div>
</template>

<script>
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
      nominee: {
        name: '',
        contact: '',
        why: '',
      },
      submitAttempted: false,
      success: false,
    }
  },
  props: ['content'],
  methods: {
    nominate() {
      this.$store.commit('newNominee', this.nominee)
    }
  },
  computed: {}
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
