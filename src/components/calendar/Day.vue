<template lang="jade">

.day
	.date {{ day }}
	p.event(v-for='event in daysEvents') ~ {{ event.title }}

</template>

<script>
import Event from './Event.vue'
import Tooltip from 'tether-tooltip'
import Vue from 'vue'

export default {
  components: {
    Event
  },
  props: ['day', 'month', 'year'],
  computed: {
    daysEvents() {
      return this.$store.state.calendar.events
        .filter(eventObj => {
          return (
            eventObj.when.day == this.day &&
            eventObj.when.month == this.month &&
            eventObj.when.year == this.year
          )
        })
    },
  },
}
</script>

<style lang='stylus' scoped>
  @import "../../styles/main";

  .day
    background-color: white
    border-style: dashed
    border-radius: 5px
    border-color: black
    border-width: 1px
    overflow: visible

  .date
    text-align:right
    height: 30px
    margin-top: 0
    margin-bottom:-30px
    color: black
    font-weight: bolder
    font-size: .9em
    padding: 5px 5px 5px 5px

  .event
    position:relative
    float: left
    width: 100%
    font-size: .7em
    font-weight: bold
    margin-top:0
    margin-bottom:0

</style>
