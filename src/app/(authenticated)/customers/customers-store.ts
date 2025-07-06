import { Customer } from "@/app/(server)/types/customer";
import { makeAutoObservable } from "mobx";

export class CustomersStore {
    data: Customer[] | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setCustomers(data: Customer[]) {
        this.data = data;
    }
}

export const customersStore = new CustomersStore();