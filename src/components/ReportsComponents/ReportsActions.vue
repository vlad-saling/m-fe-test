<template>
  <div class="reports-header__actions">
    <div class="reports-header__action">
      <button
          @click="toggleDropdown('project')"
          :class="{ isActive: projectDropdownActive }"
          class="hasDropdown"
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
      <button
          @click="toggleDropdown('gateway')"
          :class="{ isActive: gatewayDropdownActive }"
          class="hasDropdown"
      >
        Select gateway
      </button>
      <ul v-if="gatewayDropdownActive" class="reports-header__action-list">
        <li key="allGateway">
          <a href="#" class="reports-header__action-link">
            All projects
          </a>
        </li>
        <li v-for="gateway in gateways" :key="gateway.id">
          <a :href="gateway.url" class="reports-header__action-link">
            {{ gateway.name }}
          </a>
        </li>
      </ul>
    </div>
    <div class="reports-header__action">
      <button
          v-if="selectedFromDate === null && !selectingFromDate"
          @click="selectingFromDate = true"
          class="reports-header__action--date"
      >
        From date
      </button>
      <input
          v-else
          type="date"
          v-model="selectedFromDate"
      />
    </div>
    <div class="reports-header__action">
      <button
          v-if="selectedToDate === null && !selectingToDate"
          @click="selectingToDate = true"
          class="reports-header__action--date"
      >
        To date
      </button>
      <input
          v-else
          type="date"
          v-model="selectedToDate"
      />
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
      projectDropdownActive: false,
      gateways: [
        {
          id: 1,
          name: "Gateway 1",
          url: "#"
        },
        {
          id: 2,
          name: "Gateway 2",
          url: "#"
        },
        {
          id: 3,
          name: "Gateway 3",
          url: "#"
        },
        {
          id: 4,
          name: "Gateway 4",
          url: "#"
        }
      ],
      gatewayDropdownActive: false,
      selectedFromDate: null,
      selectingFromDate: false,
      selectedToDate: null,
      selectingToDate: false,
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

      &:hover {
        cursor: pointer;
      }

      &.hasDropdown {
        &:after {
          content: "";
          position: absolute;
          top: 11px;
          right: 11px;
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 10px solid var(--white);
          transition: 0.3s transform;
        }
      }

      &.isActive {
        border-radius: 5px 5px 0 0;

        &.hasDropdown {
          &:after {
            transform: rotate(180deg);
          }
        }
      }
    }

    &:last-child {
      > button {
        background-color: var(--accent-color-2);
        padding-right: 13px;
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

    // Fake placeholder for the date selector
    &--date {
      width: 145px; // tweak to prevent UI button jitter
      position: relative;
    }

    [type="date"] {
      @extend %clearInput;
      width: 145px;
      padding: 7px 13px 6px;
      border-radius: 5px;
      margin-left: 22px;
      background-color: var(--accent-color-1);
      color: var(--white);
      font-family: inherit;
      position: relative;

      &:after {
        content: "";
        position: absolute;
        width: 27px;
        height: 27px;
        right: 4px;
        top: 2px;
        background-image: url("../../assets/images/utility-icons/calendar.svg");
        background-repeat: no-repeat;
        background-color: var(--accent-color-1);
        background-position: 8px;
        pointer-events: none;
      }

      &:hover {
        cursor: pointer;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }
}
</style>