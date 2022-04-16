<template>
  <header>
    <img alt="Vue logo" class="logo" src="../assets/logo.png" width="27" height="40" />
    <button class="menu-button" aria-label="menu button">
      <span class="menu-button__hamburger">Menu</span>
    </button>
    <div class="user">
      <div class="user__avatar">
        {{ userInitials }}
      </div>
      <span class="user__name">
        {{ user.name }}
      </span>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data () {
    return {
      user: {
        name: "John Doe"
      }
    }
  },
  computed: {
    userInitials () {
      return this.user.name.split(" ").map(name => name[0]).join("")
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/placeholders.scss";

header {
  grid-area: header;
  border-bottom: 2px solid var(--border-color);
  display: flex;
}

.logo {
  margin-top: 21px;
  margin-left: 35px;
}

// menu button is intentionally larger than it appears in the design so it would be easier to use
.menu-button {
  @extend %clearButton;
  height: 50px;
  width: 65px;
  position: relative;
  margin-top: 15px;
  margin-left: 20px;

  &__hamburger {
    font-size: 0;
    display: inline-block;
    background-color: var(--accent-color-2);
    width: 20px;
    height: 4px;
    border-radius: 3px;
    position: relative;
    left: -5px;
    top: -5px;

    &:before,
    &:after {
      content: "";
      display: block;
      position: absolute;
      background-color: var(--accent-color-2);
      width: 31px;
      height: 4px;
      border-radius: 3px;
    }
    &:before {
      top: -12px;
    }
    &:after {
      bottom: -12px;
    }
  }
}

.user {
  margin: 21px 100px 16px auto;
  display: flex;
  align-items: center;

  &__avatar {
    background-color: var(--avatar-background-color);
    display: inline-block;
    height: 43px;
    width: 43px;
    margin-right: 10px;
    border-radius: 5px;
    color: var(--white);
    font-size: 23px;
    font-weight: 700;
    text-align: center;
    line-height: 43px;
  }

  &__name {
    font-size: 14px;
    font-weight: bold;
    color: var(--accent-color-2);
  }
}

</style>