<template lang="jade">

#nominees
	h1 Current Nominees
	p Check out the current nominees. Endorse an existing nominees to encourage them to run for the upcoming BC provincial election. Nominees listed are submitted by users and are not endorsed by Imagine X in any way.
	.row
		.six.columns
			label.form__label Sort by:
			select.select
				option Most recent
				option Endorsements
				option Alphabetically
				option Region / Riding
		.six.columns
			label.form__label Filter by Riding/Region:
			select.select
				option All
				option Riding 1
				option Riding 2
				option Riding 3
				option Riding 4
	nominee(v-for='(nominee, i) in nominees', :nominee='nominee')

</template>

<script>
import Nominee from './Nominee'

export default {
  data() {
    return {
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
