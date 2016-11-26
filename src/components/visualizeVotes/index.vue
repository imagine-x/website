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

  canvas(id="canvas")
  div(id="popup-container")
    div(id="popup")

</template>

<script>
import _ from 'lodash'
import {mlas} from './mlas'
import { rawbillsSorted , ynSorted } from './processBills'

let bills = rawbillsSorted

import MlaLegend from './MlaLegend'
import Instructions from './Instructions'
import Filters from './Filters'

export default {
  components: {
    MlaLegend,
    Instructions,
    Filters
  },
  data() {
    return {
      isOpen: false,
      filterIsOpen: true,
    }
  },
  computed: {
    mlas: () => {
        let mlasSorted = {};

        _(mlas).keys().sort().forEach((key) => {
            mlasSorted[key] = mlas[key];
        });

        return mlasSorted;
    }
  },
  methods: {
    toggleFilters() {
      this.filterIsOpen = !this.filterIsOpen;
    },
    clearFilters() {
      var passedCheckbox = document.getElementById('passed-checkbox');
      var mlaSelect = document.getElementById('mla-select');
      var timeRadio = document.getElementById('time-radio');
      var event = new Event('change');

      if (passedCheckbox.checked) {
        passedCheckbox.click();
      }
      timeRadio.click();
      mlaSelect.value = '0';
      mlaSelect.dispatchEvent(event);
    }
  },
  mounted: function(){

        var graph = function(){
            return new (function(){
                var highlightPassed = false;
                var mlaSelected = null;

                self.state = {
                    billsection: null
                }

                self.setup = function setup(){
                    window.canvas = document.getElementById('canvas');
                    window.ctx = canvas.getContext('2d');
                    window.window_width = document.body.scrollWidth;
                    window.window_height = document.body.scrollHeight;
                    canvas.width = window_width;
                    canvas.height = window_height;
                    var devicePixelRatio = window.devicePixelRatio || 1;
                    var backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
                    window.ratio = devicePixelRatio / backingStoreRatio;
                    if(devicePixelRatio !== backingStoreRatio) {
                        var oldWidth = canvas.width;
                        var oldHeight = canvas.height;
                        canvas.width = oldWidth * ratio;
                        canvas.height = oldHeight * ratio;
                        canvas.style.width = oldWidth + 'px';
                        canvas.style.height = oldHeight + 'px';
                        ctx.scale(ratio, ratio);
                    }
                    var scale = null;
                    for (var i = 0; i < bills.length; i++){
                        if (scale < bills[i].yays.length) scale = bills[i].yays.length;
                        if (scale < bills[i].nays.length) scale = bills[i].nays.length;
                    }

                    self.width = canvas.width / ratio;
                    self.height = canvas.height / ratio;
                    self.margin = 50;
                    self.h_interval = ((self.width - margin)/ bills.length);
                    self.v_interval = (((self.height - margin) / (scale * 4.1)));
                    self.colors = {
                        NDP: 'rgba(255,200,0,1)',
                        Liberal: 'rgba(255,0,0,1)',
                        Green: 'rgba(0,255,0,1)',
                        Independent: 'rgba(125,125,125,1)',
                        Selected: 'rgba(0,0,0,1)'
                    }
                    self.fadedColors = {
                        NDP: 'rgba(255,200,0,0.65)',
                        Liberal: 'rgba(255,0,0,0.65)',
                        Green: 'rgba(0,255,0,0.65)',
                        Independent: 'rgba(125,125,125,0.65)',
                        Selected: 'rgba(0,0,0,1)'
                    }
                    self.v_center = height / 2;
                }();

                self.grid = function grid(){
                    ctx.beginPath();
                    ctx.fillStyle = 'white';
                    ctx.fillRect(0,0,width,height);
                    ctx.closePath();
                    ctx.beginPath();
                    ctx.fillStyle = 'grey';
                    for (var x = margin / 2; x < (width - (margin / 2)); x += h_interval){
                        for (var y = margin / 2; y < (height - (margin / 2)); y += v_interval){
                            ctx.fillRect(x,y,1,1);
                        }
                    }
                    ctx.closePath();
                };

                self.frame = function(){
                    ctx.beginPath();
                    ctx.strokeStyle = 'lightgrey';
                    ctx.lineWidth = 1;
                    ctx.lineCap="square";
                    ctx.moveTo(margin / 2, v_center);
                    ctx.lineTo(width - margin / 2, v_center);
                    ctx.stroke();
                    ctx.closePath();
                    ctx.beginPath();
                    ctx.fillStyle = 'white';
                    ctx.strokeStyle = 'lightgrey';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(margin/2,margin/2,width-margin,height-margin);
                    ctx.closePath();
                }

                self.animate_dot = function animate_dot(x,y,party){
                    var opacity = 0;
                    var party_color = mlaSelected ? fadedColors[party] : colors[party];
                        ctx.beginPath();
                        ctx.fillStyle = party_color;
                        ctx.arc(x,y,v_interval,0,Math.PI * 2);
                        ctx.fill();
                        ctx.closePath();
                }

                self.plot_bill = function(bill, x){
                    var yaysLength = bill.yays.length;
                    var naysLength = bill.nays.length;
                    var billIsPassed = yaysLength > naysLength;

                    var maxVoteCount = billIsPassed ? yaysLength : naysLength;

                    if (highlightPassed & billIsPassed) {
                        self.state.billsection = Math.floor((x - margin / 2) / h_interval);
                        ctx.beginPath();
                        ctx.fillStyle = 'rgba(150, 234, 52, 0.2)';
                        ctx.fillRect(self.state.billsection * h_interval + margin / 2, margin / 2, h_interval,self.height - margin);
                        ctx.closePath();
                    }

                    for (var i = 0, y = v_interval + 5; i < maxVoteCount; i++){
                        var party = null;

                        if (bill.yays[i]){
                            party = (mlaSelected === bill.yays[i][0]) ? 'Selected' : bill.yays[i][1];
                            animate_dot(x, v_center - y, party);
                        }
                        if (bill.nays[i]){
                            party = (mlaSelected === bill.nays[i][0]) ? 'Selected' : bill.nays[i][1];
                            animate_dot(x, v_center + y, party);
                        }
                        y += (v_interval * 2);
                    }
                }

                self.chart = function(){
                    var count = bills.length;
                    var i = 0;
                    x = margin / 2 + (h_interval / 2)
                    for (var i = 0, x = margin / 2 + (h_interval / 2); i < count; i++){
                        plot_bill(bills[i], x)
                        x += h_interval
                    }
                };

                self.listeners = function(){
                    var popup = document.getElementById('popup');
                    var container = document.getElementById('popup-container');
                    var timeInput = document.getElementById('time-radio');
                    var yaynayInput = document.getElementById('yn-radio');
                    var passedCheckbox = document.getElementById('passed-checkbox');
                    var mlaSelect = document.getElementById('mla-select');
                    var canvas = document.getElementById('canvas');

                    canvas.addEventListener('mousemove', function(e){
                        self.init(bills);
                        var x = e.clientX;
                        if(x > margin / 2 && x < width - margin / 2)
                        self.state.billsection = Math.floor((x - margin / 2) / h_interval);
                        ctx.beginPath();
                        ctx.fillStyle = 'rgba(0,0,0,0.05)';
                        ctx.fillRect(self.state.billsection * h_interval + margin / 2,margin/2,h_interval,self.height-margin);
                        ctx.closePath();
                    });

                    timeInput.addEventListener('click', function(e){
                        bills = rawbillsSorted;
                        self.init(bills);
                    });

                    yaynayInput.addEventListener('click', function(e){
                        bills = ynSorted;
                        self.init(bills);
                    });

                    passedCheckbox.addEventListener('click', function(e){
                        highlightPassed = passedCheckbox.checked ? true : false;
                        self.init(bills);
                    });

                    mlaSelect.addEventListener('change', function(e){
                        mlaSelected = (this.value !== '0') ? this.value : null;
                        self.init(bills, mlaSelected);
                    });

                    canvas.addEventListener('click', function(e){
                        var billSection = bills[self.state.billsection];
                        var yays = billSection.yays;
                        var yaysLength = yays.length;
                        var nays = billSection.nays;
                        var naysLength = nays.length;

                        var billPassed = yaysLength > naysLength ? true : false;
                        var billStatusText;
                        var billStatusColour;

                        if (billPassed) {
                            billStatusText = 'PASSED';
                            billStatusColour = '#4caf50';
                        } else {
                            billStatusText = 'FAILED';
                            billStatusColour = '#f70330';
                        }

                        var billStatusBadge = '<div class="status-badge" style="background-color:' + billStatusColour + ';">' + billStatusText + '</div>';

                        var html = '<h2>' + billSection.bill + '<a href="#" target="_blank"><i class="fa fa-external-link"></i></a></h2><p class="u-margin--bottom">' + billSection.motion + '</p>';
                        html += '<p class="u-margin--bottom">Parliament: ' + billSection.parliament + ' &nbsp Session: ' + billSection.session + '</p>';
                        html += billStatusBadge;
                        html += '<hr class="u-no-margin--bottom"/><table class="table--canvas"><tr><td>';
                        html += '<span class="yay">YAYS (';
                        html += yaysLength;
                        html += ')</span></br>';
                        for (var i = 0; i < yaysLength; i++){
                            html += yays[i][0] + ', <span style="color:' + self.colors[yays[i][1]] + ';">' + yays[i][1] + '</span><br>';
                        }
                        html += '</td><td>';
                        html += '<span class="nay">NAYS (';
                        html += naysLength;
                        html += ')</span></br>'
                        for (var i = 0; i < naysLength; i++){
                            html += nays[i][0] + ', <span style="color:' + self.colors[nays[i][1]] + ';">' + nays[i][1] + '</span><br>';
                        }
                        html += '</td></tr></table>';
                        popup.innerHTML = html;
                        container.style.display = 'block';
                        popup.scrollTop = 0;

                        container.addEventListener('click', function close(){
                            html = '';
                            container.style.display = 'none';
                            container.removeEventListener('click', close);
                        });
                    });
                }();

                self.init = function init(billsArray, mlaSelected = null){
                    bills = billsArray;
                    self.grid();
                    self.frame();
                    self.chart();
                };

                self.init(bills);

            });
        }();
  }

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
