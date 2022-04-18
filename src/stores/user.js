import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        user: {}
    }),
    getters: {
        getUser: state => state.user
    },
    actions: {
        requestInitialData() {
            fetch (' http://178.63.13.157:8090/mock-api/api/users')
                .then (response => response.json())
                .then (data => {
                    this.user = data.data[0];
                })
                .catch (error => {
                    console.log (error);
                });

        }
    }
})