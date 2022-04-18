<template>
  <div class="reports-header__actions">
    <div class="reports-header__action">
      <button
        @click="toggleDropdown('Project')"
        :class="{ isActive: isProjectDropdownActive }"
        class="hasDropdown"
      >
        {{ getSelectedItemName('project') }}
      </button>
      <ul v-if="isProjectDropdownActive" class="reports-header__action-list">
        <li
          v-for="project in store.projects"
          :key="project.projectId"
          @click="selectItem('Project', project.projectId)"
        >
          {{ project.name }}
        </li>
      </ul>
    </div>
    <div class="reports-header__action">
      <button
        @click="toggleDropdown('Gateway')"
        :class="{ isActive: isGatewayDropdownActive }"
        class="hasDropdown"
      >
        {{ getSelectedItemName('gateway') }}
      </button>
      <ul v-if="isGatewayDropdownActive" class="reports-header__action-list">
        <li
          v-for="gateway in store.gateways"
          :key="gateway.gatewayId"
          @click="selectItem('Gateway' ,gateway.gatewayId)"
        >
          {{ gateway.name }}
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
      <button
        @click="generateReport(getReportQuery())"
      >
        Generate report
      </button>
    </div>
  </div>
</template>

<script>
import { useReportsStore } from "../../stores/reports";

export default {
  setup() {
    const store = useReportsStore()
    return { store }
  },
  name: "ReportsActions",
  props: {
    generateReport: Function
  },
  data () {
    return {
      selectedProject: null,
      selectedGateway: null,
      fromDate: null,
      toDate: null,
      isProjectDropdownActive: false,
      isGatewayDropdownActive: false,
      selectedFromDate: null,
      selectingFromDate: false,
      selectedToDate: null,
      selectingToDate: false,
    }
  },
  methods: {
    toggleDropdown (itemType) {
      this[`is${itemType}DropdownActive`] = !this[`is${itemType}DropdownActive`];
    },
    selectItem (itemType, item) {
      this["selected" + itemType] = item;
      this[`is${itemType}DropdownActive`] = false;
    },
    getSelectedItemName (itemType) {
      if (itemType === "project") {
        if (this.selectedProject === null) {
          return "Select project"
        }
        return this.store.projects.find(project => project.projectId === this.selectedProject).name
      }

      if (itemType === "gateway") {
        if (this.selectedGateway === null) {
          return "Select gateway"
        }
        return this.store.gateways.find(gateway => gateway.gatewayId === this.selectedGateway).name
      }
    },
    getReportQuery () {
      // check if year in date is 2021
      if ((this.selectedFromDate === null || this.selectedToDate === null) || (this.selectedFromDate.substring(0, 4) !== "2021" || this.selectedToDate.substring(0, 4) !== "2021")) {
        alert("Please select dates from 2021");
      } else {
        // compare dates
        if (this.selectedFromDate > this.selectedToDate) {
          alert("Starting date cannot be later than ending date");
        } else {
          return {
            projectId: this.selectedProject,
            gatewayId: this.selectedGateway,
            from: this.selectedFromDate,
            to: this.selectedToDate,
          }
        }

      }
    },
  },
  created() {
    const main = useReportsStore();
    main.requestInitialData();
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
      padding: 8px 26px 8px 13px;
      width: 145px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;

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
        opacity: 0.9;
        color: var(--white);

        &:hover {
          cursor: pointer;
          opacity: 1;
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