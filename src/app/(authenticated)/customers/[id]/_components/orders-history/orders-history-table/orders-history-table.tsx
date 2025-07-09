import { DataTable } from "@/components/data-table";
import { ORDERS_HISTORY_COLUMNS } from "./orders-history-table-columns";
import { OrderDto } from "@/dtos/orders/order.dto";

type OrdersHistoryTableProps = {
    data: OrderDto[];
    onRowClick?: (order: OrderDto) => void;
}

export function OrdersHistoryTable({ data, onRowClick }: OrdersHistoryTableProps) {
    return (
        <DataTable columns={ORDERS_HISTORY_COLUMNS} data={data} onRowClick={onRowClick} />
    );
}