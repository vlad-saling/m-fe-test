<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Navigation from "./components/Navigation.vue";
</script>

<script>
import { useUserStore } from "./stores/user";

export default {
name: "B-App",
created() {
  const main = useUserStore();
  main.requestInitialData();
}
};
</script>

<template>
  <Header />
  <Navigation />
  <main>
    <RouterView />
  </main>
  <footer>
    <p>
      <a href="#">Terms&Conditions</a> | <a href="#">Privacy policy</a>
    </p>
  </footer>
</template>

<style lang="scss">
@import './assets/scss/base.scss';

#app {
  display: grid;
  grid-template: "header header" 80px
"sidebar content" minmax(calc(100vh - 122px), auto)
"footer footer" 42px/90px auto
}

main {
  grid-area: content;
  display: flex;
  flex-direction: column;
}

footer {
  grid-area: footer;
  padding: 0 100px 22px;

  > p > a {
    color: var(--accented-copy-color);
    font-weight: bold;
    text-decoration: none;
  }
}

</style>
