<template lang="jade">
#votes
    thank-you
    terms-of-use
    privacy
    popup
    heading(:content='headingContent')
    .row.container
        .four.columns.layout__sidebar.u-hide-at-sm
            navigation
            application
        .eight.columns.layout__main
            p Think your MLA represents your voice in the BC legislature in Victoria? Think again. The BC legislature voting data shows that unless your MLA is an independent member, their votes are usually whipped to party lines – meaning that your MLA is most likely representing party politics in Victoria back to you. Use the interactive app below to discover your MLA's voting record.
            instructions
            statistics
    hr
    .row.container--full
      .six.columns
        filters.u-margin-bottom--large
      .six.columns
        mla-legend
        label HIGHLIGHTED VOTE
        p.vote-name {{ title }}
    span.rotate YAY
    span.rotate.rotate--bottom NAY
    span.rotate.rotate--right YAY
    span.rotate.rotate--bottom.rotate--right NAY
    .row.container--full
      whip-canvas
      footer-x

</template>

<script>
import MlaLegend from './MlaLegend'
import Instructions from './Instructions'
import Statistics from './Statistics'
import Filters from './Filters'
import WhipCanvas from './whipCanvas/index.vue'
import Popup from './popup'
import Navigation from '../generics/Navigation'
import Heading from '../generics/Heading'
import Application from '../generics/Application'
import ThankYou from '../generics/ThankYou.vue'
import FooterX from '../generics/FooterX.vue'
import Privacy from '../generics/Privacy.vue'
import TermsOfUse from '../generics/TermsOfUse.vue'

let headingContent = ['MLA Voting Records App']

export default {
  data(){
    return { headingContent }
  },
  components: {
    Heading,
    Navigation,
    MlaLegend,
    Instructions,
    Filters,
    WhipCanvas,
    Statistics,
    Popup,
    Application,
    ThankYou,
    FooterX
  },
  methods: {
    changeMode(){
      this.$store.dispatch(`CHANGE_MODE`, 'imagine')
    }
  },
  computed: {
    title(){
      let bill = this.$store.state.visualizeVotes.bill
      if (bill.bill){
        return bill.bill + ' – ' + bill.motion
      } else {
        return 'Hover over or press a column to retrieve vote name'
      }
    }
  }
}

</script>
<style lang='stylus'>
@import "../../styles/main";
.about {
    display: inline-block;
    float: right;
    font-weight: bold;
    margin-bottom: 0;
    margin-top: 0.5rem;
    cursor: pointer;
}
.rotate {
    position: absolute;
    transform: rotate(-90deg);
    transform-origin: 100% 100%;
    margin-top: 22vh;
    z-index: z-index-2;
    font-size: 12px;
    color: gray;
    margin-left: -0.1rem;
}

.rotate--bottom {
    margin-top: 69vh;
    margin-left: -0.3rem;
}

.rotate--right {
    right: 0;
    margin-left: 0rem;
    margin-right: -0.1rem;
}
.logo {
    cursor: pointer;
}
.label--expand {
  display: inline-block;
  margin-right: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.vote-name {
    height: 5rem;
}

@media (min-width: breakpoint) {
    .about {
        margin-top: 1rem;
    }
}
</style>
