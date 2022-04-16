<template>
  <div class="reports-header__actions">
    <div class="reports-header__action">
      <button
          @click="toggleDropdown('project')"
          :class="{ isActive: projectDropdownActive }"
      >
        Select project
      </button>
      <ul v-if="projectDropdownActive" class="reports-header__action-list">
        <li key="allProjects">
          <a href="#" class="reports-header__action-link">
            All projects
          </a>
        </li>
        <li v-for="project in projects" :key="project.id">
          <a :href="project.url" class="reports-header__action-link">
            {{ project.name }}
          </a>
        </li>
      </ul>
    </div>
    <div class="reports-header__action">
      <button>Select gateway</button>
    </div>
    <div class="reports-header__action">
      <button>From date</button>
    </div>
    <div class="reports-header__action">
      <button>To date</button>
    </div>
    <div class="reports-header__action">
      <button>Generate report</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReportsActions",
  data () {
    return {
      selectedProject: null,
      selectedGateway: null,
      fromDate: null,
      toDate: null,
      projects: [
        {
          id: 1,
          name: "Project 1",
          url: "#"
        },
        {
          id: 2,
          name: "Project 2",
          url: "#"
        },
        {
          id: 3,
          name: "Project 3",
          url: "#"
        },
        {
          id: 4,
          name: "Project 4",
          url: "#"
        }
      ],
      projectDropdownActive: false
    }
  },
  methods: {
    toggleDropdown (dropdown) {
      this[dropdown + "DropdownActive"] = !this[dropdown + "DropdownActive"];
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/placeholders.scss";

.reports-header {
  &__actions {
    margin-left: auto;
    margin-right: 100px;
    display: flex;
  }

  &__action {
    position: relative;

    > button {
      @extend %clearButton;
      margin-left: 22px;
      background-color: var(--accent-color-1);
      color: var(--white);
      border-radius: 5px;
      padding: 8px 52px 8px 13px;

      &.isActive {
        border-radius: 5px 5px 0 0;
      }
    }

    &:last-child {
      > button {
        background-color: var(--accent-color-2);
      }
    }

    &-list {
      position: absolute;
      background-color: var(--accent-color-1);
      left: 22px;
      width: calc(100% - 22px);
      border-radius: 0 0 5px 5px;
      list-style: none;
      padding: 8px 13px;

      > li {
        font-size: 14px;

        > a {
          color: var(--white);
          text-decoration: none;
        }
      }
    }
  }
}
</style>