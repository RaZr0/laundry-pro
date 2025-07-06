"use client"

import { Order } from "@/app/(server)/types/order";
import { SortingHeader } from "@/components/data-table";
import { cn } from "@/lib/utils";
import { formatDateAndTime } from "@/utils/dates";
import { formatPrice } from "@/utils/price";
import { ColumnDef } from "@tanstack/react-table";

const STATUSES_MAP: Record<string, {className: string, label : string}> = {
  "pending": { className: "bg-yellow-100 text-yellow-800", label: "ממתין" },
  "in_progress": { className: "bg-blue-100 text-blue-800", label: "בטיפול" },
  "completed": { className: "bg-green-100 text-green-800", label: "הושלם" },
  "cancelled": { className: "bg-red-100 text-red-800", label: "בוטל" },
}

export const ORDERS_HISTORY_COLUMNS: ColumnDef<Order>[] = [
  {
    accessorKey: "orderNumber",
    header: ({ column }) => {
      return (
        <SortingHeader column={column}>
          מספר הזמנה
        </SortingHeader>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <SortingHeader column={column}>
          תאריך
        </SortingHeader>
      )
    },
    cell: ({ row }) => {
      return <span>{formatDateAndTime(row.original.createdAt)}</span>;
    },
    sortingFn: (rowA, rowB) => {
      const dateA = new Date(rowA.original.createdAt);
      const dateB = new Date(rowB.original.createdAt);

      if (dateA < dateB) return 1;
      if (dateA > dateB) return -1;
      return 0;
    }
  },
  {
    accessorKey: "items",
    header: ({ column }) => {
      return (
        <SortingHeader column={column}>
          פריטים
        </SortingHeader>
      )
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <SortingHeader column={column}>
          סה"כ
        </SortingHeader>
      )
    },
    cell: ({ row }) => {
      return <span>{formatPrice(row.original.total)}</span>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <SortingHeader column={column}>
          סטטוס
        </SortingHeader>
      )
    },
    cell: ({ row }) => {
      const status = STATUSES_MAP[row.original.status];
      return <span className={cn('text-xs font-semibold py-0.5 px-3 border rounded-full', status?.className)}>{status?.label}</span>;
    },
  },
]