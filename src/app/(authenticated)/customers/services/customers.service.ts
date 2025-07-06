import z from "zod";
import { FormSchema } from "../_components/new-customer-dialog/new-customer-form/schema/schema";
import { Customer } from "@/app/(server)/types/customer";

export async function fetchCustomers(): Promise<Customer[]> {
    try{
        const res = await fetch('/api/customers');
        return res.json();

    }
    catch (error) {
        throw error;
    }
}

export async function fetchCustomerById(id: string): Promise<Customer> {
    try {
        const res = await fetch(`/api/customers?id=${id}`);
        if (!res.ok) {
            throw new Error('Failed to fetch customer');
        }
        return res.json();
    } catch (error) {
        throw error;
    }
}

export async function createCustomer(customer: z.infer<typeof FormSchema>): Promise<void> {
    try {
        const res = await fetch('/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer),
        });

        if (!res.ok) {
            throw new Error('Failed to create customer');
        }
    } catch (error) {
        throw error;
    }
}