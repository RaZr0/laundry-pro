'use client'

import { Page } from "@/components/page";
import { useCreateOrder } from "@/hooks/actions/orders/mutations/useCreateOrder";
import { useRouter } from "next/navigation";
import { NewOrderView } from "./_components/new-order-view";
import { FormValues } from "./schema";

export default function NewOrderPage() {
    const router = useRouter();
    const mutation = useCreateOrder();

    async function onCreateOrderSubmit(data: FormValues) {
        try{
            const res = await mutation.mutateAsync(data);
            router.push(`/orders/${res.orderNumber}`);
        }
        catch(error) {
            console.error("Error creating order:", error);
        }
    } 

    return ( 
        <Page title="צור הזמנה חדשה">
            <NewOrderView onSubmit={onCreateOrderSubmit}/>
        </Page>
     );
}