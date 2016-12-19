<template>
	<div id="nominees">
		<h1>Current Nominees</h1>
		<p>Check out the current nominees. Endorse an existing nominees to encourage them to run for the upcoming BC provincial election. Nominees listed are submitted by users and are not endorsed by Imagine X in any way.</p>
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
		area: '',
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
