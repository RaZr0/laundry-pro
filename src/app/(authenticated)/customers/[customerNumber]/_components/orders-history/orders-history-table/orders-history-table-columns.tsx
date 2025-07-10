"use client"

import { SortingHeader } from "@/components/data-table";
import { formatDateAndTime } from "@/utils/dates";
import { calculateOrderTotal } from "@/utils/order";
import { formatPrice } from "@/utils/price";
import { ColumnDef } from "@tanstack/react-table";
import { OrderItems } from "../order-items";
import { OrderStatus } from "../../../../../../../components/order-status";
import { OrderDto } from "@/dtos/orders/order.dto";

export const ORDERS_HISTORY_COLUMNS: ColumnDef<OrderDto>[] = [
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
    cell: ({ row }) => {
      return (<OrderItems data={row.original.orderItems} />
      )
    }
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <SortingHeader column={column}>
          {'סה"כ'}
        </SortingHeader>
      )
    },
    cell: ({ row }) => {
      return <span>{formatPrice(calculateOrderTotal(row.original))}</span>;
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
      return (<OrderStatus order={row.original}/> );
    },
  },
]