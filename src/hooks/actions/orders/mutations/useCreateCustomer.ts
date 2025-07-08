import { useMutation } from "@tanstack/react-query";

async function createCustomer(request: CreateCustomerRequest): Promise<void> {
    try {
        const res = await fetch('/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!res.ok) {
            throw new Error('Failed to create customer');
        }
    } catch (error) {
        throw error;
    }
}

export type CreateCustomerRequest = {
    firstName: string;
    lastName: string;
    phone: string;
    email?: string;
    street?: string,
    city?: string;
    postalCode?: string;
    apartmentFloor?: number;
    apartmentNumber?: number;
    apartmentEntrance?: string;
    apartmentEntryCode?: string;
    prefrencesNotes?: string;
    joinMarketing: boolean;
    sendReminders: boolean;
    orderAcceptedAlert: boolean;
    orderInProgressAlert: boolean;
    orderReadyAlert: boolean;
    orderDeliveredAlert: boolean;
}

export function useCreateCustomer() {
    const mutation = useMutation({
        mutationFn: async (data: CreateCustomerRequest) => {
            return createCustomer(data);
        },
    });

    return mutation;
}

