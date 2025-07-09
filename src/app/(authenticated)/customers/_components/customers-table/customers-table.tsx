"use client"

import { DataTable } from "@/components/data-table"
import { CUSTOMER_COLUMNS } from "./customers-table-columns"
import { CustomerDto } from "@/dtos/customers/customer.dto";

type CustomersTableProps = {
  data: CustomerDto[];
  onRowClick?: (customer: CustomerDto) => void;
}

export function CustomersTable({
  data,
  onRowClick
}: CustomersTableProps) {

  return (
    <DataTable columns={CUSTOMER_COLUMNS} data={data} onRowClick={onRowClick} />
  )
}