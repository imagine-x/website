<template>
<nav class="navigation navigation--sidebar">
  <ul class="list--clean">
    <li >
      <router-link to="home">HOME</router-link>
    </li>
    <li>
      <router-link to="nominate">NOMINATE AN INDEPEDENT CANDIDATE</router-link>
    </li>
    <li>
      <router-link to="votes">MLA VOTING RECORDS APP</router-link>
    </li>
    <li>
      <router-link to="press">PRESS RELEASES</router-link>
    </li>
  </ul>
</nav>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
@import "../../styles/main"

.router-link-active
  font-weight: bold;

li {
    border-bottom: 1px solid lightgray;
    margin-bottom: 0;
    padding: 0.65rem 0;
}
a {
    text-decoration: none;
}

.navigation--offcanvas {
    li {
        padding: 0.65rem 2rem;
    }
}
.navigation--offcanvas.is-open {
    display: block;
}
.navigation--sidebar {
    display: none;
}

@media (min-width: breakpoint) {
    .navigation--sidebar {
        display: block;
    }
}

</style>
