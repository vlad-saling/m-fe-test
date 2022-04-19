import { defineStore } from 'pinia'

export const useReportsStore = defineStore({
  id: 'reports',
  state: () => ({
    projects: [],
    gateways: [],
    user: {}
  }),
  getters: {},
  actions: {
    requestInitialData() {
      fetch (' http://178.63.13.157:8090/mock-api/api/projects')
        .then (response => response.json())
        .then (data => {
          this.projects = [];
          this.projects.push({
            id: 'all',
            name: 'All projects'
          });
          this.projects = [
            ...this.projects,
            ...data.data
          ];
        })
        .catch (error => {
          console.log (error);
        });

      fetch (' http://178.63.13.157:8090/mock-api/api/gateways')
        .then (response => response.json())
        .then (data => {
          this.gateways = [];
          this.gateways.push({
            id: 'all',
            name: 'All gateways'
          });
          this.gateways = [
            ...this.gateways,
            ...data.data
          ];
        })
        .catch (error => {
          console.log (error);
        });

      fetch (' http://178.63.13.157:8090/mock-api/api/users')
        .then (response => response.json())
        .then (data => {
          this.user = [...data.data];
        })
        .catch (error => {
          console.log (error);
        });

    }
  }
})
