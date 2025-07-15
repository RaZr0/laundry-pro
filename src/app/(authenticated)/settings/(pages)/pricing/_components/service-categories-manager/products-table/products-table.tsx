"use client"

import { DataTable } from "@/components/data-table"
import { PRODUCT_COLUMNS } from "./products-table-columns"
import { ProductDto } from "@/dtos/product.dto";

type ProductsTableProps = {
  data: ProductDto[];
  onRowClick?: (customer: ProductDto) => void;
  className?: string;
}

export function ProductsTable({
  data,
  onRowClick,
  className
}: ProductsTableProps) {

  return (
    <DataTable columns={PRODUCT_COLUMNS} data={data} onRowClick={onRowClick} className={className} />
  )
}