<template>

<nav :class="style.className">
  <ul class="list--clean">
    <li>
        <a class="is-active" href="/">HOME</a>
    </li>
    <li>
        <a href="/votes">MLA VOTING RECORDS APP</a>
    </li>
  </ul>
</nav>

</template>

<script>
export default {
  props:['className'],
  computed: {
    style(){
      return {
        className: 'navigation ' + this.className
      }
    }
  }
}

</script>

<style lang="stylus" scoped>
@import "../../styles/main"

.navigation {
    li {
        border-bottom: 1px solid lightgray;
        padding: 0.65rem;
        margin-bottom: 0;
    }
    a {
        text-decoration: none;
    }
    a.is-active {
        font-weight: bold;
    }
}
.navigation--offcanvas {
    display: none;
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
    .navigation--offcanvas, .navigation--offcanvas.is-open {
        display: none;
    }
    .navigation--sidebar {
        display: block;
    }
}

</style>
