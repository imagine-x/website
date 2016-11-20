<template lang="jade">

div
  .header-container
    img.logo(src='../../../static/images/imaginex.svg')
    p Think your MLA represents your voice in the BC legislature in Victoria? Think again. The BC legislature voting data shows that unless your MLA is an independent member, their votes are usually whipped to party lines - meaning that your MLA is representing Victoria back to you. Use the interactive app below to discover your MLA's voting record.
    label HOW TO USE THE APP
    p
      ul
        li Each rectangle represents a vote in the legislature between 2009 to 2016 for the 40th and 41st parliaments under the Christy Clark government. A vote can be a motion for an ammendment, bill or other matters. Votes are sorted by whether it was passed and then chronologically. Click on the rectangle to discover the details of each vote.
        li Each dot represents an MLA who voted. The colour of the dot represents the MLA's party affiliation.
        li The top half of the graph represents 'YAY' votes. The bottom of the graph represents 'NAY votes'. Votes are passed if there are more 'YAY' votes than 'NAY' votes.
    hr
  canvas(id="canvas")
  div(id="popup-container")
    div(id="popup")

</template>

<script>
import _ from 'lodash'
import {rawbills} from './bills'

let rawbillsSorted = rawbills.map(bill => {
  bill.yays = _.sortBy(bill.yays, mla => {
    return mla[1]
  })

  bill.nays = _.sortBy(bill.nays, mla => {
    if(mla) return mla[1];
  })
  return bill
})

let passed = rawbillsSorted.filter(bill => {
  return bill.yays.length > bill.nays.length
})

let passedOverwhelmingly = passed.filter(bill => {
  return bill.nays.length < bill.yays.length - 30
})

let passedPartisan = passed.filter(bill => {
  return bill.nays.length > bill.yays.length - 30
})

let failed = rawbillsSorted.filter(bill => {
  return bill.nays.length > bill.yays.length
})

let failedPartisan = failed.filter(bill => {
  return bill.nays.length < bill.yays.length + 30
})

let failedBadly = failed.filter(bill => {
  return bill.nays.length > bill.yays.length + 30
})

let bills = _.concat(passedOverwhelmingly, passedPartisan, failedPartisan, failedBadly)

export default {
  mounted: function(){


        var graph = function(){
            return new (function(){

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
                        Independent: 'rgba(125,125,125,1)'
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
                    var party_color = colors[party];
                        ctx.beginPath();
                        ctx.fillStyle = party_color;
                        ctx.arc(x,y,v_interval,0,Math.PI * 2);
                        ctx.fill();
                        ctx.closePath();
                }

                self.plot_bill = function(bill, x){
                    var count;
                    (bill.yays.length > bill.nays.length) ? count = bill.yays.length : count = bill.nays.length;
                    for (var i = 0, y = v_interval + 5; i < count; i++){
                        if (bill.yays[i]){
                            animate_dot(x, v_center - y, bill.yays[i][1])
                        }
                        if (bill.nays[i]){
                            animate_dot(x, v_center + y, bill.nays[i][1])
                        }
                        y += (v_interval*2);
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
                    document.addEventListener('mousemove', function(e){
                        self.init();
                        var x = e.clientX;
                        if(x > margin / 2 && x < width - margin / 2)
                        self.state.billsection = Math.floor((x - margin / 2) / h_interval);
                        ctx.beginPath();
                        ctx.fillStyle = 'rgba(0,0,0,0.05)';
                        ctx.fillRect(self.state.billsection * h_interval + margin / 2,margin/2,h_interval,self.height-margin);
                        ctx.closePath();
                    });
                    canvas.addEventListener('click', function(e){
                        var html = '<h2>' + bills[self.state.billsection].bill + '</h2><p>' + bills[self.state.billsection].motion + '</p>'
                        html += '<table class="table--canvas"><tr><td>';
                        html += '<span class="yay">YAYS</span><br>';
                        for (var i = 0; i < bills[self.state.billsection].yays.length; i++){
                            html += bills[self.state.billsection].yays[i][0] + ', <span style="color:' + self.colors[bills[self.state.billsection].yays[i][1]] + ';">' + bills[self.state.billsection].yays[i][1] + '</span><br>';
                        }
                        html += '</td><td>';
                        html += '<span class="nay">NAYS</span><br>';
                        for (var i = 0; i < bills[self.state.billsection].nays.length; i++){
                            html += bills[self.state.billsection].nays[i][0] + ', <span style="color:' + self.colors[bills[self.state.billsection].nays[i][1]] + ';">' + bills[self.state.billsection].nays[i][1] + '</span><br>';
                        }
                        html += '</td></tr></table>';
                        popup.innerHTML = html;
                        container.style.display = 'block';

                        container.addEventListener('click', function close(){
                            html = '';
                            container.style.display = 'none';
                            container.removeEventListener('click', close);
                        });
                    });
                }();

                self.init = function init(){
                    self.grid();
                    self.frame();
                    self.chart();
                };

                self.init();

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
h2 {
    font-size: 26px;
    line-height: 1.2;
    margin-bottom: 0.4rem;
    letter-spacing: -.1rem;
    font-weight: bold;
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
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255,255,255,0.7);
    display: none;
}
#popup-container #popup {
    position: absolute;
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
}
#popup-container #popup table td {
    vertical-align: top;
    width: 50%;
    line-height: 24px;
}
.yay, .nay {
    font-weight: 700;
}
.table--canvas {
    margin-top: 1.5rem;
}
.logo {
    max-width: 15rem;
    margin-bottom: 2rem;
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
</style>
