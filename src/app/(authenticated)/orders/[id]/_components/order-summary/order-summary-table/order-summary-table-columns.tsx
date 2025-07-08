"use client"

import { SortingHeader } from "@/components/data-table";
import { OrderItem } from "@/types/order-item";
import { formatPrice } from "@/utils/price";
import { ColumnDef } from "@tanstack/react-table";

export const ORDER_SUMMARY_COLUMNS: ColumnDef<OrderItem>[] = [
  {
    accessorKey: "product",
    header: ({ column }) => {
      return (
        <SortingHeader column={column}>
          פריט
        </SortingHeader>
      )
    },
    cell: ({ row }) => {
      return (
        <span>{row.original.product.name}</span>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <SortingHeader column={column}>
          כמות
        </SortingHeader>
      )
    },
  },
  {
    accessorKey: "serviceType",
    header: ({ column }) => {
      return (
        <SortingHeader column={column}>
          סוג שירות
        </SortingHeader>
      )
    },
    cell: ({ row }) => {
      return (
        <span>{row.original.product.serviceCategory.name}</span>
      );
    },
  },
  {
    accessorKey: "notes",
    header: ({ column }) => {
      return (
        <SortingHeader column={column}>
          הערות מיוחדות
        </SortingHeader>
      )
    },
    cell: ({ row }) => {
      const notes = row.original.notes;
      return (
        <span>{notes ?? '-'}</span>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => {
      return (
        <SortingHeader column={column}>
          מחיר
        </SortingHeader>
      )
    },
    cell: ({ row }) => {
      const totalPrice = row.original.product.price * row.original.quantity;
      return (
        <span>{formatPrice(totalPrice)}</span>
      );
    },
  },
]