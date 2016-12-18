<template lang="jade">
#imaginex
	thank-you
	privacy
	main
		heading(v-bind:content='idea.heading')
		.row.container
			.eight.columns.layout__main
				variable-body(v-bind:content='idea.variable')
				b Join us and together let's Reimagine Politics, Reimagine BC.
				hr
			.four.columns.layout__sidebar
				navigation
				application
				hr.hr--hide-lg
			.eight.columns.layout__main
				div(v-if='idea.main')
					values(v-bind:content='idea.values')
					hr
					who
				div(v-else)
					who
					hr
					values(v-bind:content='idea.values')
				hr(v-if='idea.sources.length > 0')
				sources(v-bind:content='idea.sources')
				footer-x
</template>

<script>
import VariableBody from '../generics/VariableBody.vue'
import Values from './Values'
import Heading from '../generics/Heading.vue'
import Who from '../generics/Who.vue'
import ThankYou from './ThankYou.vue'
import Privacy from '../generics/Privacy.vue'
import FooterX from '../generics/FooterX.vue'
import Sources from '../generics/Sources.vue'
import Application from '../generics/Application.vue'
import Navigation from '../generics/Navigation.vue'

export default {
  computed: {
	idea() {
	  return this.$store.state.idea.content
	},
  },
  components: {
		Navigation,
	VariableBody,
	Heading,
	Who,
	ThankYou,
		Privacy,
	FooterX,
	Sources,
	Application,
	Values,
  },
	beforeMount(){
		this.$store.dispatch("SET_IMAGINE_X_BY_URL", window.location.pathname )
	}
}
</script>

<style lang="stylus" scoped>
@import "../../styles/main"


main
	font-family: Arial, san-serif;


@media (max-width: breakpoint) {
	.layout__sidebar {
		display:none
	}
}

@media (min-width: breakpoint) {
	.hr--hide-lg {
		display: none;
	}
}
</style>
