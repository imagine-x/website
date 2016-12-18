<template lang="jade">
.legend
  label MLA LEGEND
  ul.list--clean.list--inline
    li
      div.legend__item-container
        div.full-circle
        span.legend__item-label BC Liberal
    li
      div.legend__item-container
        div.full-circle.full-circle--ndp
        span.legend__item-label BC NDP
    li
      div.legend__item-container
        div.full-circle.full-circle--green
        span.legend__item-label BC Greens
    li
      div.legend__item-container
        div.full-circle.full-circle--indie
        span.legend__item-label Independent
    li
      div.legend__item-container
        div.full-circle.full-circle--selected
        span.legend__item-label Selected
  label VOTE LEGEND
  ul.list--clean.list--inline
    li
      div.legend__item-container
        div.square.square--passed
        span.legend__item-label Passed
    li
      div.legend__item-container
        div.square
        span.legend__item-label Failed
    li
      div.legend__item-container
        div.rectangle
        span.legend__item-label Party affiliation of motion mover
</template>

<script>

</script>

<style lang='stylus'>
@import "../../styles/main";
.legend {
    display: inline-block;
}
.legend__item-container {
  display: inline-block;
}
.legend__item-label {
    margin-left: 0.5rem;
    margin-right: 1.5rem;
}
.full-circle {
    background-color: rgba(255,0,0,1);
    height: 8px;
    border-radius: 50%;
    width: 8px;
    display: inline-block;
}
.full-circle--ndp {
    background-color: rgba(255,200,0,1);
}
.full-circle--green {
    background-color: rgba(0,255,0,1);
}
.full-circle--indie {
    background-color: rgba(125,125,125,1);
}
.full-circle--selected {
    background-color: rgba(0,0,0,1);
}
.square {
    display: inline-block;
    height: 10px;
    width: 10px;
    background: white;
    border: 1px dotted gray;
}
.square--passed {
    background: rgba(150, 234, 52, 0.3);
}
.rectangle {
    display: inline-block;
    height: 5px;
    width: 15px;
    background: black;
    transform: translateY(-3px);
}

</style>
