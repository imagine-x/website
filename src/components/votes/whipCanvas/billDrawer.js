const log = console.log
import store from '../../../vuex/store'
import Kefir from 'kefir'
import _ from 'lodash'
import {
  mlas
} from '../mlas'
import {
  rawbillsSorted,
  ynSorted
} from './processBills'

function selectBill(bill){
  store.commit('setSelectedBill', bill)
}

const listeners = {}

export const drawBill = (mlaSelected, sortBy) => {
  var bills
  switch (sortBy) {
    default:
      case 'time':
      bills = rawbillsSorted
    break;
    case 'result':
        bills = ynSorted
      break;
  }

  const fillColors = {
    passed: 'rgba(150, 234, 52, .1)',
    mouseover: 'rgba(0,0,0,.06)',
  }

  const colors = {
    NDP: 'rgba(255,200,0,1)',
    Liberal: 'rgba(255,0,0,1)',
    Green: 'rgba(0,255,0,1)',
    Independent: 'rgba(125,125,125,1)',
    Selected: 'rgba(0,0,0,1)'
  }
  const fadedColors = {
    NDP: 'rgba(255,200,0,0.65)',
    Liberal: 'rgba(255,0,0,0.65)',
    Green: 'rgba(0,255,0,0.65)',
    Independent: 'rgba(125,125,125,0.65)',
    Selected: 'rgba(0,0,0,1)'
  }
  const canvasContainer = document.getElementById('whipcanvas');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const columnWidth = 15;
  const width = (columnWidth * bills.length) + 2;
  const height = window.innerHeight;
  const v_center = (height / 2);
  const margin = 0;
  const marginVertical = 30;
  var scale = null;
  for (var i = 0; i < bills.length; i++) {
    if (scale < bills[i].yays.length) scale = bills[i].yays.length;
    if (scale < bills[i].nays.length) scale = bills[i].nays.length;
  }
  const h_interval = columnWidth;
  const v_interval = (((height - marginVertical) / (scale * 4.1)));
  const devicePixelRatio = window.devicePixelRatio || 1;
  const backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
  const ratio = devicePixelRatio / backingStoreRatio;
  var canvasContainerOffset = 0;

  function grid() {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = 'grey';
    for (var x = margin / 2; x < (width - (margin / 2)); x += h_interval) {
      for (var y = marginVertical / 2; y < (height - (marginVertical / 2)); y += v_interval) {
        ctx.fillRect(x, y, 1, 1);
      }
    }
    ctx.closePath();
  }

  canvas.height = height
  canvas.width = width;

  function frame() {
    ctx.beginPath()
    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 0.3;
    ctx.strokeRect(margin / 2, marginVertical / 2, width - margin, height - marginVertical)
    ctx.closePath()
  }

  function centerLine() {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 0.3;
    ctx.lineCap = "circle";
    ctx.moveTo(margin / 2, v_center);
    ctx.lineTo(width - margin / 2, v_center);
    ctx.stroke();
    ctx.closePath();
  }

  function animate_dot(x, y, party) {
    var party_color = mlaSelected ? fadedColors[party] : colors[party];
    ctx.beginPath();
    ctx.fillStyle = party_color;
    ctx.arc(x, y, v_interval, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  function animate_motion_mover(x, party) {
    var xOffset = 0.3;
    var party_color = colors[party];
    x = x + xOffset;
    var xNext = x + h_interval - xOffset;
    var y = marginVertical / 2;
    var height = h_interval / 4;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, height + y);
    ctx.lineTo(xNext, height + y);
    ctx.lineTo(xNext, y);
    ctx.closePath();
    ctx.fillStyle = party_color;
    ctx.fill();
  }

  function highlightSection(billSection, color) {
    ctx.beginPath()
    ctx.fillStyle = color
    let x = billSection * h_interval;
    let y = marginVertical / 2;
    let w = h_interval;
    let h = height - marginVertical;
    ctx.fillRect(x, y, w, h);
    ctx.closePath();
  }

  function plot_bill(bill, n) {
    var yaysLength = bill.yays.length;
    var naysLength = bill.nays.length;
    var billIsPassed = yaysLength > naysLength;
    var maxVoteCount = billIsPassed ? yaysLength : naysLength;
    var mlaInBill = false;

    if (billIsPassed) {
      var sectionWidth = (n - margin / 2) / h_interval;
      var billSection = Math.floor(sectionWidth);
      highlightSection(billSection, fillColors.passed);
    }

    if (mlaSelected) {
      var billYay = bill.yays
      var mlaNames = billYay.concat(bill.nays);

      for (var r = 0; r < mlaNames.length; r++) {
        if (mlaNames[r][0] === mlaSelected) {
          mlaInBill = true;
        }
      }
    }

    if (mlaSelected && mlaInBill || !mlaSelected) {
      for (var i = 0, y = v_interval + 5; i < maxVoteCount; i++) {
        var party = null;
        if (bill.yays[i]) {
          party = (mlaSelected === bill.yays[i][0]) ? 'Selected' : bill.yays[i][1];
          animate_dot(n, v_center - y, party);
        }
        if (bill.nays[i]) {
          party = (mlaSelected === bill.nays[i][0]) ? 'Selected' : bill.nays[i][1];
          animate_dot(n, v_center + y, party);
        }
        y += (v_interval * 2);
      }
    }
  }

  function chart() {
    var count = bills.length;

    for (var i = 0, x = margin / 2 + (h_interval / 2); i < count; i++) {
      plot_bill(bills[i], x);
      x += h_interval
    }

    for (var i = 0, x = 0; i < count; i++) {
      animate_motion_mover(x, bills[i].mover.party);
      x += h_interval;
    }
  }

  function setScrollOffset() {
    var canvasContainerScrollLeft = canvasContainer.scrollLeft;

    if (canvasContainerScrollLeft === 0) {
      canvasContainerOffset = 0;
    } else {
      canvasContainerOffset = (canvasContainerScrollLeft / columnWidth) * columnWidth;
    }
  }

  let emit = null
  let throttledMousemove = Kefir.stream(emitter => {
      emit = emitter.emit
    })
    .skipDuplicates() // +1 only re-render on change
    .throttle(10)
    .filter(billSection => billSection >= 0)
    .filter(billSection => billSection <= 108)
    .log()
    .onValue(billSection => {
      init();
      highlightSection(billSection, fillColors.mouseover);
      selectBill(bills[billSection]);
    })

  function bindEvents() {

    function mouseHighlight(e) {
      let location = e.clientX + canvasContainerOffset;
      let billSection = Math.floor((location - marginVertical * (3/4)) / h_interval);
      emit(billSection);
    }

    canvas.removeEventListener('mousemove', listeners.mousemove)
    listeners.mousemove = mouseHighlight
    canvas.addEventListener('mousemove',  listeners.mousemove)

    canvasContainer.addEventListener('scroll', function(e) {
      let canvasContainerScrollLeft = canvasContainer.scrollLeft;
      let canvasContainerPosition = canvasContainer.offsetWidth + canvasContainerScrollLeft;
      let overflowCls = 'is-overflowing';
      let overflowLeftCls = 'is-overflowing--left';

      if (canvasContainerPosition >= canvas.width) {
        canvasContainer.classList.remove(overflowCls);
      } else {
        if (!canvasContainer.classList.contains(overflowCls)) {
          canvasContainer.classList.add(overflowCls);
        }
      }

      if (canvasContainerScrollLeft === 0) {
        canvasContainer.classList.remove(overflowLeftCls);
      } else {
        canvasContainer.classList.add(overflowLeftCls);
      }

      document.getElementById('scroll').classList.remove('is-visible');

      setScrollOffset();
    });
  }

  function init() {
    grid();
    frame();
    chart();
    centerLine();
    setScrollOffset();
    bindEvents();
  }

  init();
}
