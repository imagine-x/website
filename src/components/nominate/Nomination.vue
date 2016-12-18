<template>
<div class='application'>
  <form class="form" id='form'>
    <fieldset>
        <legend>Nomination form</legend>
        <label class="form__label" for="nominee-name">Nominee full name</label>
        <input type='text' id="nominee-name" name='name' v-model='nominee.name' v-bind:style='nameInputStyle'></input>
        <label class="form__label" for="nominee-email">Nominee email <span class="help-text">(For contact purposes only. Will not be displayed)</span></label>
        <input type='text' name='mail' id="nominee-email" v-model='nominee.contact' v-bind:style='mailInputStyle'></input>
        <label class="form__label" for="whybox">In a few sentences tell us why they would be a good candidate</label>
        <textarea class="why-area" rows="5" id='whybox' name='why' v-model='nominee.why'></textarea>
        <legend>Your details <span class="help-text">(For contact purposes only. Will not be published)</span></legend>
        <div class='checkbox-container'>
          <input type="checkbox">
          <span>Yes, I promise.</span>
          </input>
        </div>
        <!-- <input type='text' placeholder='Your Name' name='your' v-model='info.name' v-bind:style='nameInputStyle'></input>
        <input type='text' name='mail' placeholder='Your Email' v-model='info.contact' v-bind:style='mailInputStyle'></input> -->
        <button class="btn" @click.prevent='nominate'>Submit</button>
    </fieldset>
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
	.invalidbtn
		background-color:red

	.successbtn
		background-color:green

</style>
