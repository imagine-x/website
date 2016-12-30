<template>
	<div id="nominees">
		<p>This is a list of independent candidate nominees for the upcoming BC provincial election. These nominees were nominated by citizens like you. If you like an existing nominee, show your support and enthusiam by endorsing their nomination! If we can, we'll even try to contact the nominees to let them know about their public endorsement. Nominees listed are submitted by users and are not endorsed by Imagine X in any way.</p>
		<p>Don't see a nominee below whom you'd like to run? <router-link to="/nominate"><b>Nominate someone today</b></router-link>.</p>
		<hr>
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
				<label class="form__label">Filter by Riding/Region:</label>
				<select class="select" v-model="area" >
					<option>All</option>
					<optgroup label="Region">
						<option v-for="r in regions">{{ r }}</option>
					</optgroup>
					<optgroup label="Riding">Riding
						<option v-for="r in ridings">{{ r }}</option>
					</optgroup>
				</select>
			</div>
		</div>
		<nominee v-for='(nominee, i) in nominees' :nominee='nominee'></nominee>
	</div>
</template>

<script>
import Nominee from './Nominee'
import { regions, ridings } from './data'

export default {
  data() {
	return {
		area: 'All',
	  regions,
	  ridings
	}
  },
  computed: {
	nominees() {
	  return this.$store.state.nomination.nominees
	},
  },
  components: {
	Nominee,
  },
}
</script>

<style lang="stylus" scoped>
  @import "../../styles/main"
</style>
