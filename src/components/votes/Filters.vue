<template lang="jade">
#filters
  a(href="#", @click.prevent="toggleFilters")
    h6.label--expand FILTERS
    i.fa.fa-plus(v-show="!filterIsOpen")
    i.fa.fa-minus(v-show="filterIsOpen")
  div(v-show="filterIsOpen")
    span Sort by: &nbsp
    input(type="radio", name="sort", value="result", @change='sort', id="yn-radio", v-model="sortBy")
    label.input-label(for="yn-radio") YAY to NAY
    &nbsp&nbsp
    input(type="radio", name="sort", value="time", id="time-radio", @change='sort', v-model="sortBy")
    label.input-label(for="time-radio") Time
    br
    label(class="no-bold") Select MLA:
    select.select(id="mla-select", @change='sort', v-model='mlaSelected')
      option(v-for="name in sortedMlaNames" v-bind:value="name")  {{name}}, {{mlas[name].district}} ({{mlas[name].party}})
    div
      a(href="#" class="text--small" @click.prevent="clearFilters") Clear all filters
    br

</template>

<script>
import _ from 'lodash'
import {
  rawbillsSorted,
  ynSorted
} from './whipCanvas/processBills'
import {drawBill} from './whipCanvas/billDrawer'// function(mlaSelected, highlightPassed, sortBy)

import {
  mlas
} from './mlas'
let sortedMlaNames = []
_(mlas).keys().sort().forEach(name => {
  sortedMlaNames.push(name)
})

export default {
  data() {
      return {
        mlaSelected: null,
        sortBy: 'result',
        mlas,
        sortedMlaNames,
        filterIsOpen: true
      }
    },
    methods: {
      toggleFilters() {
        this.filterIsOpen = !this.filterIsOpen;
      },
      sort(){
        drawBill(this.mlaSelected, this.sortBy);
        let selectedMlaLast
        if (this.mlaSelected) {
          selectedMlaLast = this.mlaSelected.split(' ').slice(1).join(' ')
        } else {
          selectedMlaLast = this.mlaSelected
        }
        document.getElementById('whipcanvas').scrollLeft = 0;
      },
      clearFilters(){
        this.mlaSelected = '';
        this.sortBy = 'result';
        this.sort();
      }
    },
    computed: {
        mlaParty() {
          let mlaParty = null;
          let count = 0;

          _(mlas).keys().forEach(name => {
            if (this.mlaSelected === name) {
              mlaParty = mlas[name].party;
            }
          });

          return mlaParty;
        },
        totalVotes() {
            return rawbillsSorted.length;
        },
        mlaVoteCount() {
          if (this.mlaSelected) {
            let count = 0;
            let billVotes;

            for (var i = 0; i < rawbillsSorted.length; i++) {
              billVotes = rawbillsSorted[i].yays;
              billVotes = billVotes.concat(rawbillsSorted[i].nays);
              for (var r = 0; r < billVotes.length; r++) {
                if (billVotes[r][0] === this.mlaSelected) {
                  count += 1;
                }
              }
            }
            return count;
          }
        },
        attendanceRate() {
          if (this.mlaSelected) {
            let count = 0;
            let billVotes;

            for (var i = 0; i < rawbillsSorted.length; i++) {
              billVotes = rawbillsSorted[i].yays;
              billVotes = billVotes.concat(rawbillsSorted[i].nays);
              for (var r = 0; r < billVotes.length; r++) {
                if (billVotes[r][0] === this.mlaSelected) {
                  count += 1;
                }
              }
            }
            return Math.round(count / rawbillsSorted.length * 100);
          }
        },
        dissentCount() {
          if (this.mlaSelected) {
            let mlaParty = null;
            let count = 0;

            _(mlas).keys().forEach(name => {
              if (this.mlaSelected === name) {
                mlaParty = mlas[name].party;
              }
            });

            for (var i = 0; i < rawbillsSorted.length; i++) {
              var bill = rawbillsSorted[i];
              let liberalYay = 0;
              let ndpYay = 0;
              let liberalNay = 0;
              let ndpNay = 0;
              let dissentCount = 0;
              let mlaYay = false;

              for (var r = 0; r < bill.yays.length; r++) {
                if (bill.yays[r][1] === 'Liberal') {
                  liberalYay += 1;
                } else if (bill.yays[r][1] === 'NDP') {
                  ndpYay += 1;
                }

                if (bill.yays[r][0] === this.mlaSelected) {
                  mlaYay = true;
                }
              }

              for (var r = 0; r < bill.nays.length; r++) {
                if (bill.nays[r][1] === 'Liberal') {
                  liberalNay += 1;
                } else if (bill.nays[r][1] === 'NDP') {
                  ndpNay += 1;
                }

                if (bill.nays[r][0] === this.mlaSelected) {
                  mlaYay = false;
                }
              }

              let liberalIsYay = liberalYay > liberalNay;
              let ndpIsYay = ndpYay > ndpNay;
              let billVotes = bill.yays;

              billVotes = billVotes.concat(rawbillsSorted[i].nays);
              for (var r = 0; r < billVotes.length; r++) {
                if (billVotes[r][0] === this.mlaSelected) {
                  if (mlaParty === 'Liberal' && mlaYay !== liberalIsYay) {
                    count += 1;
                  }
                  if (mlaParty === 'NDP' && mlaYay !== ndpIsYay) {
                    count += 1;
                  }
                }
              }
            }
            return count;
          }
        }
    }
}
</script>

<style lang='stylus'>
@import "../../styles/main";

@media (min-width: smBreakpoint) {
    select.select {
        border-radius: 0;
        width: auto;
    }
}

</style>
