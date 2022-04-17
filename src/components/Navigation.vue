<script>
export default {
  name: "Navigation"
}
</script>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav>
    <ul class="nav">
      <li class="nav__link">
        <router-link to="/">
          <img src="../assets/images/nav-icons/dashboard.svg" width="24" height="24" alt="Dashboard">
        </router-link>
      </li>
      <li class="nav__link">
        <router-link to="/">
          <img src="../assets/images/nav-icons/option-2.svg" width="25" height="25" alt="Option 2">
        </router-link>
      </li>
      <li class="nav__link">
        <router-link to="/">
          <img src="../assets/images/nav-icons/option-3.svg" width="25" height="24" alt="Option 3">
        </router-link>
      </li>
      <li class="nav__link">
        <router-link to="/reports">
          <img src="../assets/images/nav-icons/report-active.svg" width="25" height="25" alt="Report">
        </router-link>
      </li>
      <li class="nav__link">
        <router-link to="/">
          <img src="../assets/images/nav-icons/logout.svg" width="23" height="25" alt="Logout">
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>

nav {
  grid-area: sidebar;
}

.nav {
  list-style: none;
  padding: 41px 0 0 36px;

  &__link {
    display: block;
    padding: 0;
    margin: 0 0 24px 0;
    width: 25px;

    img {
      margin: 0 auto;
      display: block;
    }
  }
}

</style>