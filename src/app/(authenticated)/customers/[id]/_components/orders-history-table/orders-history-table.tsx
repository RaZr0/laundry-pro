import { DataTable } from "@/components/data-table";
import { ORDERS_HISTORY_COLUMNS } from "./orders-history-table-columns";
import { Card, CardTitle } from "@/components/ui/card";
import { Order } from "@/app/(server)/types/order";

type OrdersHistoryTableProps = {
    data: Order[];
}

export function OrdersHistoryTable({ data }: OrdersHistoryTableProps) {
    return (
        <Card>
            <CardTitle>
                היסטוריית הזמנות
            </CardTitle>
            <DataTable columns={ORDERS_HISTORY_COLUMNS} data={data} />
        </Card>
    );
}