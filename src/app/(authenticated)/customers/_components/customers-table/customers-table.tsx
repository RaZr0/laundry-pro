"use client"

import { DataTable } from "@/components/data-table"
import { Customer } from "@/types/customer"
import { CUSTOMER_COLUMNS } from "./customers-table-columns"

type CustomersTableProps = {
  data: Customer[];
  onRowClick?: (customer: Customer) => void;
}

export function CustomersTable({
  data,
  onRowClick
}: CustomersTableProps) {

  return (
    <DataTable columns={CUSTOMER_COLUMNS} data={data} onRowClick={onRowClick} />
  )
}