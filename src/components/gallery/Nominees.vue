<template>
	<div id="nominees">
		<p>This is a list of independent candidate nominees for the upcoming BC provincial election nominated by British Columbians like you. If you like an existing nominee, show your support and enthusiam by endorsing their nomination! If we can, we'll even try to contact the nominees to let them know about their public endorsement. Nominees listed are submitted by users and are not endorsed by Imagine X in any way.</p>
		<p>Know more people who should be running? <router-link to="/nominate"><b>Nominate someone today</b></router-link>.</p>
		<hr>
		<label>FILTERS</label>
		<div class="row">
			<div class="six columns">
				<label class="form__label">Sort by:</label>
				<select class="select">
					<option>Most recent</option>
					<option>Endorsements</option>
					<option>Alphabetically</option>
					<option>Region / Riding</option>
				</select>
			</div>
			<div class="six columns">
				<label class="form__label">Filter by Region/Riding:</label>
				<select class="select" v-model="area" >
					<option>All</option>
					<optgroup label="Region">
						<option v-for="l in locations">{{ l.name }}</option>
					</optgroup>
					<optgroup label="Riding">Riding
						<option v-for="r in ridings">{{ r }}</option>
					</optgroup>
				</select>
			</div>
		</div>
		<label class="legend-label">LEGEND</label>
		<i class="fa fa-check-circle official-mark"></i>
		<span>&nbsp; Official nominee registered with Elections BC</span>
		<nominee v-for='(nominee, i) in nominees' :nominee='nominee'></nominee>
	</div>
</template>

<script>
import Nominee from './Nominee'
import { locations } from '../../assets/locationData'

export default {
  data() {
	return {
	  area: 'All',
	  locations
	}
  },
  computed: {
	nominees() {
	  return this.$store.state.nomination.nominees
	},
	ridings() {
		let ridingsArray = [];

		for (let i = 0; i < locations.length; i++) {
			let locationRidings = locations[i].ridings;
			ridingsArray = ridingsArray.concat(locationRidings);
		}

		return ridingsArray.sort();
	}
  },
  components: {
	Nominee,
  },
}
</script>

<style lang="stylus" scoped>
  @import "../../styles/main"
  .legend-label {
	margin-top: 2.5rem;
  }
</style>
