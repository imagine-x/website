<template>

<div>
	<heading> </heading>
	<div class="row container">
		<div class="four columns layout__sidebar">
			<navigation></navigation>
		</div>
		<div class="eight columns layout__main">
			<p> todo </p>
			<footer-x></footer-x>
		</div>
	</div>
</div>

</template>

<script>


import Navigation from '../generics/Navigation.vue'
import Heading from '../generics/Heading.vue'
import FooterX from '../generics/FooterX.vue'

export default {
  components: {
		Navigation,Heading, FooterX
  },
}
</script>

<style lang="stylus" scoped>
  @import "../../styles/main"

</style>
