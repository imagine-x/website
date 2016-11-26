<template lang="jade">
#legend
  label LEGEND
  ul.list--clean
    li
      div.circle-container
        div.full-circle
        span.circle-label BC Liberal MLA
    li
      div.circle-container
        div.full-circle.full-circle--ndp
        span.circle-label BC NDP MLA
    li
      div.circle-container
        div.full-circle.full-circle--green
        span.circle-label BC Greens MLA
    li
      div.circle-container
        div.full-circle.full-circle--indie
        span.circle-label Independent MLA
    li
      div.circle-container
        div.full-circle.full-circle--selected
        span.circle-label Selected MLA

</template>

<script>
export default {}
</script>

<style>

.list--clean {
  list-style: none;
  padding: 0;
}
.list--clean > li {
  list-style: none;
  display: inline;
}

</style>
