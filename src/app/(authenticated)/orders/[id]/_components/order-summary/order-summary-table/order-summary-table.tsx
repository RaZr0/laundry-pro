import { DataTable } from "@/components/data-table";
import { OrderItemDto } from "@/dtos/order-item.dto";
import { ORDER_SUMMARY_COLUMNS } from "./order-summary-table-columns";

type OrderSummaryTableProps = {
    data: OrderItemDto[];
}

export function OrderSummaryTable({ data }: OrderSummaryTableProps) {
    return ( 
        <DataTable columns={ORDER_SUMMARY_COLUMNS} data={data} />
     );
}