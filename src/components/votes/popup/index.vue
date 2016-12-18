<template lang='jade'>

modal.modal--medium(:visible='showDetails')
  a.link--clean(v-if="bill.billLink", :href="bill.billLink", target="_blank")
    h2.u-no-margin--bottom {{bill.bill}}
      i(class="fa fa--large fa-external-link")
  h2.u-no-margin--bottom(v-else) {{bill.bill}}
  a.link--clean(v-if="bill.hansardLink", :href="bill.hansardLink", target="_blank")
    p {{bill.motion}}
      i(class="fa fa-external-link")
  p(v-else) {{bill.motion}}
  ul.list--clean.list--no-margin
    li
      span Parliament: {{bill.parliament}} &nbsp;
      span Session: {{bill.session}}
    li Date: {{date}}
    li.li--divider
    li(v-if="bill.sponsor")
      span(v-if="bill.sponsor.name") Bill or item sponsor: {{bill.sponsor.name}}, 
      span(v-if='bill.sponsor.party == "Green"')
        span.green{{bill.sponsor.party}}
      span(v-if='bill.sponsor.party == "Liberal"')
        span.liberal{{bill.sponsor.party}}
      span(v-if='bill.sponsor.party == "NDP"')
        span.ndp{{bill.sponsor.party}}
      span(v-if='bill.sponsor.party == "Independent"')
        span.indie{{bill.sponsor.party}}
    li(v-if="bill.mover")
      span(v-if="bill.mover.name") Motion mover: {{bill.mover.name}}, 
      span(v-if='bill.mover.party == "Green"')
        span.green{{bill.mover.party}}
      span(v-if='bill.mover.party == "Liberal"')
        span.liberal{{bill.mover.party}}
      span(v-if='bill.mover.party == "NDP"')
        span.ndp{{bill.mover.party}}
      span(v-if='bill.mover.party == "Independent"')
        span.indie{{bill.mover.party}}
  div.badge.badge--passed(v-if='billPassed') PASSED
  div.badge.badge--failed(v-else) FAILED
  hr
  .row
      .six-columns
        label YAY
          span(v-if='bill.yays')&nbsp;({{bill.yays.length}})
        ul.list--clean.list--no-margin
          li(v-for='name in bill.yays') {{name[0]}}, 
            span(v-if='name[1] == "Green"')
              span.green{{name[1]}}
            span(v-if='name[1] == "Liberal"')
              span.liberal{{name[1]}}
            span(v-if='name[1] == "NDP"')
              span.ndp{{name[1]}}
            span(v-if='name[1] == "Independent"')
              span.indie{{name[1]}}
      .six-columns
        label NAY
            span(v-if='bill.nays')&nbsp;({{bill.nays.length}})
        ul.list--clean.list--no-margin
          li(v-for='name in bill.nays') {{name[0]}}, 
            span(v-if='name[1] == "Green"')
              span.green{{name[1]}}
            span(v-if='name[1] == "Liberal"')
              span.liberal{{name[1]}}
            span(v-if='name[1] == "NDP"')
              span.ndp{{name[1]}}
            span(v-if='name[1] == "Independent"')
              span.indie{{name[1]}}
</template>

<script>
import Modal from './Modal'

export default {
    components:{ Modal },
    computed: {
        bill(){
          return this.$store.state.visualizeVotes.bill
        },
        showDetails(){
          return this.$store.state.visualizeVotes.showDetails
        },
        date() {
          var dateToFormat = new Date(this.$store.state.visualizeVotes.bill.date);
          return dateToFormat.toDateString();
        },
        billPassed() {
          let bill = this.$store.state.visualizeVotes.bill;
          let billYays = bill.yays ? bill.yays : 0;
          let billNays = bill.nays ? bill.nays : 0;
          return billYays.length > billNays.length;
        }
    }
}

</script>

<style lang='stylus' scoped>
  @import "../../../styles/main";
.six-columns {
    width: 50%;
    float: left;
}
.badge {
    display: inline;
    color: white;
    padding: .4rem .6rem;
    font-size: 13px;
}
.badge--passed {
  background-color: #4caf50;
}
.badge--failed {
  background-color: #f70330;
}
.fa-external-link:hover {
    color: gray;
}
.green {
    color: rgba(0, 255, 0, 1);
}
.liberal {
    color: red;
}
.ndp {
    color: rgba(255, 200, 0, 1);
}
.indie {
    color: rgba(125, 125, 125, 1);
}
</style>
