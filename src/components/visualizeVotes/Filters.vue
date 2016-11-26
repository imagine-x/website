<template lang="jade">

#filters
  a(href="#", @click.prevent="toggleFilters")
    h6.label--expand FILTER OPTIONS
    i.fa.fa-plus(v-bind:class="{ hidden: filterIsOpen }")
    i.fa.fa-minus(v-bind:class="{ hidden: !filterIsOpen }")
  div.filters(v-bind:class="{ open: filterIsOpen }")
    span Sort by: &nbsp
    input(type="radio", name="sort", value="0", id="time-radio", checked)
    label.input-label(for="time-radio") Time
    &nbsp&nbsp
    input(type="radio", name="sort", value="1", id="yn-radio")
    label.input-label(for="yn-radio") Yay to Nay
    br
    span Highlight: &nbsp
    input(type="checkbox", name="passed", id="passed-checkbox")
    label.input-label(for="passed-checkbox") Passed votes
    br
    label(class="no-bold") Select MLA:
    select(id="mla-select")
      option(value="0") none
      option(v-for="name in sortedMlaNames" v-bind:value="name")  {{name}}, {{mlas[name].district}}
    div
      a(href="#", class="text--small" @click.prevent="clearFilters") Clear all filters


</template>

<script>
import _ from 'lodash'
import {mlas} from './mlas'
let sortedMlaNames = []
_(mlas).keys().sort().forEach(name => {
  sortedMlaNames.push(name)
})

export default {
  data() {
    return {
      mlas,
      sortedMlaNames,
      filterIsOpen: true
    }
  },
  methods: {
    toggleFilters() {
      this.filterIsOpen = !this.filterIsOpen;
    },
  }
}
</script>

<style>

.hidden {
  display: none;
}

</style>
