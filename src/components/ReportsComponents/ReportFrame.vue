<template>
  <div
    class="reportFrame"
    :class="{'twoPanes': isTwoPane }"
  >
    <div
      class="container reportDetails"
    >
      <p class="breadCrumbs">
        {{ selectedProject }} | {{ selectedGateway }}
      </p>

      <ul
        class="reportData"
      >
        <li
          v-for="(item, index) in parsedReportData"
          @click="selectSegment(index)"
          :class="{'isSelected': selectedSegment === index || (this.selector === 'projectId' && isSingleProject) || (this.selector === 'gatewayId' && isSingleGateway)}"
        >
          <h1 v-if="(this.selector === 'projectId' && !isSingleProject) || (this.selector === 'gatewayId' && !isSingleGateway)">
            {{ item.name }}
            <span>
              TOTAL: {{formattedAmount(item.totalAmount)}}
            </span>
          </h1>
          <table
            :class="{'isSelected': selectedSegment === index || (this.selector === 'projectId' && isSingleProject) || (this.selector === 'gatewayId' && isSingleGateway)}"
            class="reportTable"
          >
            <thead>
              <tr>
                <th>
                  Date
                </th>
                <th>
                  {{ selector === 'projectId' ? 'Gateway' : 'Project' }}
                </th>
                <th>
                  Transaction ID
                </th>
                <th>
                  Amount
                </th>
              </tr>
            </thead>
            <tr v-for="transaction in item.transactions">
              <td>
                {{ getFormattedDate(transaction.created) }}
              </td>
              <td>
                {{  selector === 'projectId' ? getGatewayName(transaction.gatewayId) : getProjectName(transaction.projectId) }}
              </td>
              <td>
                {{ transaction.paymentId }}
              </td>
              <td>
                {{ formattedAmount(transaction.amount) }}
              </td>
            </tr>
          </table>
        </li>
      </ul>
    </div>

    <div v-if="chartData !== null" class="container reportChart">
      <div class="chartLegend">
        <ul v-for="(item, index) in chartData.labels">
          <li>
            <div :style="{backgroundColor: chartData.datasets[0].backgroundColor[index]}"></div> {{ chartData.labels[index] }}
          </li>
        </ul>
      </div>
      <Doughnut
        :chartData="chartData"
        :chartOptions="chartOptions"
      />
    </div>

    <div class="container reportSum">
      <p class="sum">
        {{ sumTitle }} TOTAL: {{ formattedAmount(grandTotal) }}
      </p>
    </div>
  </div>
</template>

<script>
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale)

import { useReportsStore } from "../../stores/reports";


export default {
  name: "ReportFrame.vue",
  components: {
    Doughnut
  },
  setup() {
    const store = useReportsStore()

    return { store }
  },
  props: {
    reportData: {
      type: Object
    },
    queryData: {
      type: Object
    },
  },
  data() {
    return {
      grandTotal: 0,
      selectedSegment: 1,
      chartData: null,
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          }
        },
      },
      parsedReportData: null,
      selector: this.isSingleProject ? 'gatewayId' : 'projectId'
    }
  },
  computed: {
    selectedProject() {
      const projectName = this.store.projects.find(p => p.projectId === this.queryData.projectId)?.name;
      return projectName !== undefined ? projectName : "All projects";
    },
    selectedGateway() {
      const gatewayName = this.store.gateways.find(g => g.gatewayId === this.queryData.gatewayId)?.name;
      return gatewayName !== undefined ? gatewayName : "All gateways";
    },
    isTwoPane() {
      return  ((this.isSingleGateway) && !(this.isSingleProject)) || ((this.isSingleProject) && !(this.isSingleGateway));
    },
    isSingleProject() {
      return this.queryData.projectId !== 'all' && this.queryData.projectId !== null && this.queryData.projectId !== undefined;
    },
    isSingleGateway() {
      return this.queryData.gatewayId !== 'all' && this.queryData.gatewayId !== null && this.queryData.gatewayId !== undefined;
    },
    sumTitle() {
      if ((this.isSingleProject && this.isSingleGateway) || (!this.isSingleProject && !this.isSingleGateway)) {
        return '';
      }
      return this.selector === 'projectId' ? 'PROJECT' : 'GATEWAY';
    },
  },
  methods: {
    getParsedReportData() {
      if (this.reportData !== null) {
        const dataObject = {};
        const chartData = {
          labels: [],
          datasets: [{
            label: 'Report',
            data: [],
            backgroundColor: [],
            hoverOffset: 4
          }],
        };
        let grandTotal = 0;
        this.selector = this.isSingleProject ? 'gatewayId' : 'projectId'

        this.reportData.forEach(item => {
          if (dataObject[item[this.selector]] === undefined) {
            dataObject[item[this.selector]] = {
              [this.selector]: item[this.selector],
              name: this.selector === "projectId" ? this.store.projects.find(p => p[this.selector] === item[this.selector])?.name : this.store.gateways.find(g => g[this.selector] === item[this.selector])?.name,
              totalAmount: item.amount,
              transactions: []
            };
          }
          dataObject[item[this.selector]].totalAmount += item.amount;
          dataObject[item[this.selector]].transactions.push(item);
          grandTotal += item.amount;
        });

        Object.keys(dataObject).forEach(item => {
          chartData.labels.push(dataObject[item].name);
          chartData.datasets[0].data.push(dataObject[item].totalAmount);
          chartData.datasets[0].backgroundColor.push(this.getRandomColor());
        });

        this.chartData = chartData;
        this.grandTotal = grandTotal;
        return dataObject;
      }
      return null;
    },
    getGatewayName(gatewayId) {
      return this.store.gateways.find(g => g.gatewayId === gatewayId)?.name;
    },
    getProjectName(projectId) {
      return this.store.projects.find(p => p.projectId === projectId)?.name;
    },
    formattedAmount(amount) {
      return `${amount.toLocaleString('en-US')} USD`;
    },
    getFormattedDate(date) {
      // change date from yyyy-mm-dd to mm/dd/yyyy
      return date.split("-").reverse().join("/");
    },
    selectSegment(index) {
      this.selectedSegment = index;
    },
    getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
  },
  created() {
    this.parsedReportData = this.getParsedReportData();
  },
  watch: {
    reportData: {
      handler: function (newValue) {
        this.parsedReportData = this.getParsedReportData();
      },
      deep: true
    },
  }
}
</script>

<style lang="scss" scoped>

.reportFrame {
  width: 100%;

  .reportChart {
    display: none;
  }

  &.twoPanes {
    display: grid;
    grid-template: "reportDetails reportChart" auto
      "reportDetails reportSum" 90px/60% 40%;
    grid-column-gap: 31px;

    .reportDetails {
      grid-area: reportDetails;
    }

    .reportChart {
      grid-area: reportChart;
      margin-top: 0;
      display: block;
      background-color: var(--white);
    }

    .reportSum {
      grid-area: reportSum;
    }
  }
}

.container {
  padding: 18px 24px;
  background-color: var(--module-background-color);
  border-radius: 10px;
  width: 100%;

  + .container {
    margin-top: 27px;
  }
}

.chartLegend {
  padding: 18px 24px;
  margin: -18px -24px 36px -24px;
  background-color: var(--module-background-color);
  border-radius: 10px;
  width: 100%;

  > ul {
    display: inline-flex;
    list-style: none;
    padding: 0;
    margin: 0;

    > li {
      margin-right: 25px;
      position: relative;
      > div {
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 5px;
        position: relative;
        top: 2px;
        margin-right: 5px;
      }
    }
  }
}

.breadCrumbs {
  margin-bottom: 34px;
}

.breadCrumbs,
.sum {
  font-weight: 700;
}

.reportData {
  list-style: none;
  padding: 0;
  margin: 0;

  > li {
    &:not(.isSelected) {
      margin-bottom: 5px;
    }

    > h1 {
      font-weight: 700;
      margin: 0;
      font-size: 16px;
      background-color: var(--white);
      padding: 26px 24px;
      border-radius: 10px;
      display: flex;

      > span {
        font-weight: inherit;
        margin-left: auto;
      }
    }
  }
}

.reportTable {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 14px 0;
  display: none;

  &.isSelected {
    display: table;
  }

  th, td {
    padding: 5px;

    &:last-child {
      text-align: right;
    }
  }

  > thead > tr > th {
    background-color: var(--white)
  }

  > tr:nth-child(odd) > td {
    background-color: var(--white);
  }


}
</style>