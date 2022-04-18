<template>
  <div class="reports-header">
    <div class="title">
      <h1>Reports</h1>
      <p>Easily generate a report of your transactions</p>
    </div>
    <ReportsActions
        :generateReport="generateReport"
    />
  </div>
</template>

<script>
import ReportsActions from "./ReportsActions.vue";

export default {
  name: "ReportsHeader",
  components: {
    ReportsActions
  },
  props: {
    generateReport: Function
  }
}
</script>

<style lang="scss" scoped>
.reports-header {
  display: flex;
  align-items: center;
  margin-top: 35px;
  padding-left: 8px;

  .title {
    > h1 {
      font-weight: 700;
      font-size: 24px;
    }
    > p {
      font-size: 16px;
      color: var(--secondary-copy-color);
      font-weight: 700;
    }
  }
}
</style>