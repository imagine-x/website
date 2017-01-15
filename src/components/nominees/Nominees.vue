<template>
	<div id="nominees">
		<p>This is a list of independent candidate nominees for the upcoming BC provincial election nominated by British Columbians like you. If you like an existing nominee, show your support and enthusiasm by endorsing their nomination! If we can, we'll even try to contact the nominees to let them know about their public endorsement. Nominees listed are submitted by users and are not endorsed by Imagine X in any way.</p>
		<p>Know more people who should be running? <router-link to="/nominate"><b>Nominate someone today</b></router-link>.</p>
		<hr>
		<label>FILTERS</label>
		<div class="row">
			<div class="six columns">
				<label class="form__label">Sort by:</label>
				<select class="select" v-model="sortBy">
					<option value="recent">Most recent</option>
					<option value="endorsement">Endorsements</option>
					<option value="alpha">Alphabetically</option>
                    <option value="regionriding">Region / Riding</option>
				</select>
			</div>
			<div class="six columns">
				<label class="form__label">Filter by Region/Riding:</label>
				<select class="select" v-model="area">
					<option>All</option>
					<optgroup label="Region">
						<option v-for="l in locations">{{ l.name }}</option>
					</optgroup>
					<optgroup label="Riding">Riding
						<option v-for="r in ridings">{{ r }}</option>
					</optgroup>
				</select>
			</div>
            <div>
                <a href="#" class="text--small" @click.prevent="clearFilters">Clear all filters</a>
            </div>
		</div>
		<label class="legend-label">LEGEND</label>
		<i class="fa fa-check-circle official-mark"></i>
		<span>&nbsp; Official nominee registered with Elections BC</span>
		<nominee v-for='(nominee, i) in nomineesList' :nominee='nominee'></nominee>
        <div v-show="noNominees" class="nothing container">
            <p><b>There are currently no nominees for this region / riding. Nominate someone today.</b></p>
            <div class="u-align--center">
                <router-link to="/nominate">
                    <button>Nominate now &nbsp;></button>
                </router-link>
            </div>
        </div>
	</div>
</template>

<script>
import Nominee from './Nominee'
import { locations } from '../../assets/locationData'

export default {
  data() {
	return {
      locations,
	  area: 'All',
      sortBy: 'recent',
      noNominees: false
	}
  },
  methods: {
    clearFilters() {
        this.area = 'All';
        this.sortBy = 'recent';
        this.noNominees = false;
    }
  },
  computed: {
    nomineesList() {
        let nomineesList = _.clone(this.$store.state.nomination.nominees);
        let area = this.area;
        let sortBy = this.sortBy;

        nomineesList = _.sortBy(nomineesList, '_id').reverse();

        switch (sortBy) {
            case 'recent':
                nomineesList = _.sortBy(nomineesList, '_id').reverse();
                break;
            case 'endorsement':
                nomineesList = _.sortBy(nomineesList, 'support').reverse();
                break;
            case 'alpha':
                nomineesList = _.sortBy(nomineesList, 'name');
                break;
            case 'regionriding':
                nomineesList = _.sortBy(nomineesList, 'location');
                nomineesList = _.sortBy(nomineesList, 'riding');
        }

        nomineesList = _.filter(nomineesList, (item) => {
            if (item.location === area) {
                return item.location === area;
            } else if (item.riding === area ) {
                return item.riding === area;
            } else if (area === 'All') {
                return nomineesList;
            }
        });

        this.noNominees = nomineesList.length > 0 ? false : true;

        return nomineesList;
    },
		ridings() {
			let ridingsArray = []
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
  .nothing {
    margin-top: 5rem;
  }
</style>
