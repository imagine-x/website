<template>
<nav class="navigation">
  <ul class="list--clean">
    <router-link to="/" exact>
        <li>HOME</li>
    </router-link>
    <router-link to="/nominate">
        <li>NOMINATE AN INDEPEDENT CANDIDATE</li>
    </router-link>
    <router-link to="/nominees">
        <li>INDEPEDENT NOMINEES GALLERY</li>
    </router-link>
    <router-link to="/votes">
        <li>MLA VOTING RECORDS APP</li>
    </router-link>
    <router-link to="/news">
        <li>NEWS</li>
    </router-link>
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

.navigation__link {
    margin-right: 15px;
    margin-left: 15px;
}

li {
    border-bottom: 1px solid lightgray;
    margin-bottom: 0;
    padding: 0.65rem 1rem;
    list-style: none;
    display: inline-block;
    width: 100%;
}

a {
    text-decoration: none;
}

.navigation--offcanvas {
    li {
        padding: 0.65rem 1rem;
    }
}
.navigation--offcanvas.is-open {
    display: block;
}
.navigation--sidebar {
    display: none;
}

.navigation--header
  display:block

@media (min-width: breakpoint) {
    .navigation--sidebar {
        display: block;
    }

    .navigation--header{
      display:none
    }

    .navigation__link {
        margin-right: 0;
        margin-left: 0;
    }

    li {
        padding-left: 0;
        padding-right: 0;
    }
}

</style>
