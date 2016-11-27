<template lang="jade">
div
  div.header-container
    img.logo(src='../../../static/images/imaginex.svg')
  div.container--full
    h1 MLA Voting Records
    p Think your MLA represents your voice in the BC legislature in Victoria? Think again. The BC legislature voting data shows that unless your MLA is an independent member, their votes are usually whipped to party lines - meaning that your MLA is representing Victoria back to you. Use the interactive app below to discover your MLA's voting record.
    instructions
  div.container--full
    div.six.columns.u-margin-bottom--large
      filters
    div.six.columns
      mla-legend
  whip-canvas

</template>

<script>
import MlaLegend from './MlaLegend'
import Instructions from './Instructions'
import Filters from './Filters'
import WhipCanvas from './WhipCanvas'

export default {
  components: {
    MlaLegend,
    Instructions,
    Filters,
    WhipCanvas,
  },
}

</script>
<style>
* {
    margin: 0;
    padding: 0;
    font-size: 15px;
    font-family: 'Arial', sans-serif;
    text-rendering: optimizeLegibility;
    box-sizing: border-box;
}
h1 {
  font-size: 30px;
  font-weight: bold;
}
h2 {
    font-size: 26px;
    line-height: 1.2;
    margin-bottom: 0.4rem;
    letter-spacing: -.1rem;
    font-weight: bold;
}
a {
  color: black;
}
a:hover {
  color: gray;
}
canvas {
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -100;
  cursor: pointer;
}

#popup-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255,255,255,0.7);
    display: none;
}
#popup-container #popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    max-width: 600px;
    max-height: 600px;
    background: white;
    border: 1px solid #dddddd;
    box-shadow: 0 1px 0 #dddddd;
    overflow: scroll;
    padding: 25px;
    line-height: 24px;
}
#popup-container #popup table {
    width: 100%;
    margin-bottom: 0;
}
#popup-container #popup table td {
    vertical-align: top;
    width: 50%;
    line-height: 24px;
    border-bottom: 0;
}
.yay, .nay {
    font-weight: 700;
}
.table--canvas {
    margin-top: 1.5rem;
}
.logo {
    max-width: 11.5rem;
}
.header-container {
    display: block;
    width: 100%;
    background: white;
    padding: 3rem;
    padding-bottom: 0;
}
ul {
    padding-left: 1.75rem;
}
li {
    list-style-type: square;
    list-style-position: outside;
}
.status-badge {
    display: inline;
    color: white;
    padding: 0.4rem 0.6rem;
    font-size: 13px;
}
.u-margin--bottom {
    margin-bottom: 1rem;
}
.u-no-margin--bottom {
    margin-bottom: 0;
}
select, select:focus {
    outline: 1px solid black;
    border-radius: 0;
    border: 0;
    max-width: 100%;
    margin-bottom: 0.5rem;
}
.no-bold {
    font-weight: normal;
}
.fa-external-link {
    margin-left: 1rem;
    font-size: 2rem;
    color: black;
}
.fa-external-link:hover {
    color: gray;
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
.circle-label {
    margin-left: 0.5rem;
    margin-right: 1.5rem;
}
.circle-container {
  display: inline-block;
}
.list--clean {
  list-style: none;
  padding: 0;
}
.list--clean > li {
  list-style: none;
  display: inline;
}
.u-margin-bottom--large {
  margin-bottom: 2rem;
}
.label--expand {
  display: inline-block;
  margin-right: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.container--full {
  padding: 0 20px;
}
.header-container {
  padding: 2rem 20px;
  margin-bottom: 5rem;
  border-bottom: 1px solid #e0e1dc;
}
.text--small {
  font-size: 12px;
}
.input-label {
  display: inline-block;
  margin-left: 0.5rem;
  margin-right: 1rem;
  font-weight: normal;
}
@media (min-width: 480px) {
    .logo {
        max-width: 15rem;
    }
    .header-container {
      border-bottom: 0;
      margin-bottom: 1rem;
    }
}
</style>
