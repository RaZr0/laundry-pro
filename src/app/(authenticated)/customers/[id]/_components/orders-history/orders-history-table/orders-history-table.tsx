import { DataTable } from "@/components/data-table";
import { ORDERS_HISTORY_COLUMNS } from "./orders-history-table-columns";
import { OrderDto } from "@/dtos/orders/order.dto";

type OrdersHistoryTableProps = {
    data: OrderDto[];
}

export function OrdersHistoryTable({ data }: OrdersHistoryTableProps) {
    return (
        <DataTable columns={ORDERS_HISTORY_COLUMNS} data={data} />
    );
}