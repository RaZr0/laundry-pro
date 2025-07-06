"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { NewCustomerDialog } from "./new-customer-dialog/new-customer-dialog";

export function TitleActions() {
    const [isNewCustomerModal, setIsNewCustomerModal] = useState(false);

    return (
        <div>
            <Button onClick={() => setIsNewCustomerModal(true)}>
                <Plus />
                לקוח חדש
            </Button>
            <NewCustomerDialog open={isNewCustomerModal} onClose={() => setIsNewCustomerModal(false)} />
        </div>
    );
}