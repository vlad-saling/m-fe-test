<template>
  <ReportsHeader
    :generateReport="generateReport"
  />
  <div class="reports">
    <Welcome v-if="!reportGenerated" />
    <ReportFrame v-else :reportData="reportData" :queryData="queryData" />
  </div>
</template>

<script>
import ReportsHeader from "../components/ReportsComponents/ReportsHeader.vue";
import Welcome from "../components/ReportsComponents/Welcome.vue";
import ReportFrame from "../components/ReportsComponents/ReportFrame.vue";

export default {
  components: {
    ReportsHeader,
    Welcome,
    ReportFrame
  },
  data() {
    return {
      reportGenerated: false,
      reportData: null,
      queryData: null
    };
  },
  methods: {
    generateReport(reportQuery) {
      if (reportQuery) {
        this.queryData = reportQuery;
        fetch("http://178.63.13.157:8090/mock-api/api/report", {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(reportQuery)
        }).then(res =>  res.json()).then(data => {
          if (data.data.length > 0) {
            this.reportGenerated = true;
            this.reportData = data.data;
          } else {
            alert("No data found for the given query. Please change date range, project or gateway");
          }
        });
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.reports {
  padding: 27px 100px 27px 8px;
  color: var(--main-copy-color);
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
}
</style>
