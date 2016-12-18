<template lang="jade">

#whipcanvas.whipcanvas.is-overflowing
    div#scroll.is-visible SCROLL
      i.fa.fa-arrow-right
    canvas(id="canvas", @click='showDetails')

</template>

<script>
import _ from 'lodash'
import {drawBill} from './billDrawer'

export default {
	mounted: function() {
		drawBill(false, 'result')
	},
	methods: {
		showDetails(){
			this.$store.commit('setShowDetails', true)
		}
	}
}
</script>


<style lang='stylus' scoped>
  @import "../../../styles/main";

#whipcanvas {
    overflow-y: hidden;
    width: 100%;
}

#scroll.is-visible {
    position: absolute;
    display: block;
    right: 0;
    background: gray;
    opacity: 0.95;
    padding: 0.5rem 1rem;
    color: white;
    margin-right: 3rem;
    transform: translateY(48vh);
    font-size: 1.2rem;
    font-weight: bold;
    animation: fade 2s ease-in-out;
    animation-iteration-count: infinite;
}

#scroll {
    display: none;
}

@keyframes fade {
  0% { opacity: 0 }
  30%, 70% { opacity: 0.95 }
  100% { opacity: 0 }
}

.is-overflowing.whipcanvas:after {
    position: absolute;
    display: block;
    content: " ";
    width: 3rem;
    height: 110%;
    z-index: z-index-1;
    margin-right: 1rem;
    transform: translateY(-100%);
    right: 0;
    background: linear-gradient(to right,rgba(255,255,255,0), white);
}

.is-overflowing--left.whipcanvas:before {
    position: absolute;
    display: block;
    content: " ";
    width: 3rem;
    height: 110%;
    z-index: z-index-1;
    margin-left: 2.5rem;
    left: 0;
    background: linear-gradient(to left,rgba(255,255,255,0), white);
}

canvas {
	z-index: 1000;
	min-width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: -100;
	cursor: pointer;
}

.table--canvas {
	margin-top: 1.5rem;
}

</style>
