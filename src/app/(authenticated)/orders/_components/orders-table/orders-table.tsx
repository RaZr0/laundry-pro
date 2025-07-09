"use client"

import { DataTable } from "@/components/data-table"
import { ORDER_COLUMNS } from "./orders-table-columns"
import { OrderDto } from "@/dtos/orders/order.dto";

type OrdersTableProps = {
  data: OrderDto[];
  onRowClick?: (customer: OrderDto) => void;
}

export function OrdersTable({
  data,
  onRowClick
}: OrdersTableProps) {

  return (
    <DataTable columns={ORDER_COLUMNS} data={data} onRowClick={onRowClick} />
  )
}