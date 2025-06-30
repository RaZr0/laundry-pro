import { makeAutoObservable } from "mobx";

export class LayoutStore {
    isSidebarOpen = false;

    constructor() {
        makeAutoObservable(this);
    }

    toggleSidebar(open?: boolean) {
        this.isSidebarOpen = typeof open === 'boolean' ? open : !this.isSidebarOpen;
    }
}

export const layoutStore = new LayoutStore();