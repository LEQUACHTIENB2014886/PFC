import { defineStore } from "pinia";

export const usePFCStore = defineStore("PFCStore", {
    state: () => ({
        selectedRow: null,
    }),
    actions: {
        setSelectedRow(row) {
            this.selectedRow = row;
        },
    },
});
