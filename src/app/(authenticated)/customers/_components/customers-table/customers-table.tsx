"use client"

import { Customer } from "@/app/(server)/types/customer"
import { DataTable, DataTableProps } from "@/components/data-table"

export function CustomersTable({
  columns,
  data,
  onRowClick
}: DataTableProps<Customer, unknown>) {

  return (
    <DataTable columns={columns} data={data}  onRowClick={onRowClick} />
  )
}