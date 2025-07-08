"use client"

import { DataTable } from "@/components/data-table"
import { Order } from "@/types/order"
import { ORDER_COLUMNS } from "./orders-table-columns"

type OrdersTableProps = {
  data: Order[];
  onRowClick?: (customer: Order) => void;
}

export function OrdersTable({
  data,
  onRowClick
}: OrdersTableProps) {

  return (
    <DataTable columns={ORDER_COLUMNS} data={data} onRowClick={onRowClick} />
  )
}