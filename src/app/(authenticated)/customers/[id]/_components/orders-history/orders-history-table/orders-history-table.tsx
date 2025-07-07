import { DataTable } from "@/components/data-table";
import { Order } from "@/types/order";
import { ORDERS_HISTORY_COLUMNS } from "./orders-history-table-columns";

type OrdersHistoryTableProps = {
    data: Order[];
}

export function OrdersHistoryTable({ data }: OrdersHistoryTableProps) {
    return (
        <DataTable columns={ORDERS_HISTORY_COLUMNS} data={data} />
    );
}