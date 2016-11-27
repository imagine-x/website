<template lang="jade">
#instructions
  a(href="#", @click.prevent='toggleInstructions')
    h6.label--expand HOW TO USE THE APP
    i.fa.fa-plus(v-bind:class="{ hidden: isOpen }")
    i.fa.fa-minus(v-bind:class="{ hidden: !isOpen }")
  div.instructions(v-bind:class="{ open: isOpen }")
    ul
      li Each rectangle represents a vote in the legislature between 2013 to 2016 for the 40th parliament under the B.C. Liberal government. A vote can be a motion for an ammendment, bill or other matters. Click on the rectangle to discover the details of each vote.
      li Each dot represents an MLA who voted. The colour of the dot represents the MLA's party affiliation.
      li The top half of the graph represents 'YAY' votes. The bottom of the graph represents 'NAY votes. Votes are passed if there are more 'YAY' votes than 'NAY' votes.
  hr

</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggleInstructions() {
      this.isOpen = !this.isOpen;
    },
  }
}
</script>

<style>

.instructions, .filters {
  display: none;
}
.instructions.open, .filters.open {
  display: block;
}

.hidden {
  display: none;
}

</style>
