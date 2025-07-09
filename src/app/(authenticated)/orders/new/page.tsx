'use client'

import { Page } from "@/components/page";
import { NewOrderView } from "./_components/new-order-view";
import { useCreateOrder } from "@/hooks/actions/orders/mutations/useCreateOrder";
import { FormValues } from "./schema";

export default function NewOrderPage() {

    const mutation = useCreateOrder();

    function onCreateOrderSubmit(data: FormValues) {
        mutation.mutate(data)
    } 

    return ( 
        <Page title="צור הזמנה חדשה">
            <NewOrderView onSubmit={onCreateOrderSubmit}/>
        </Page>
     );
}