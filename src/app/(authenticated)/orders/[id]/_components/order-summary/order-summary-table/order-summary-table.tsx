import { DataTable } from "@/components/data-table";
import { OrderItem } from "@/types/order-item";
import { ORDER_SUMMARY_COLUMNS } from "./order-summary-table-columns";

type OrderSummaryTableProps = {
    data: OrderItem[];
}

export function OrderSummaryTable({ data }: OrderSummaryTableProps) {
    return ( 
        <DataTable columns={ORDER_SUMMARY_COLUMNS} data={data} />
     );
}