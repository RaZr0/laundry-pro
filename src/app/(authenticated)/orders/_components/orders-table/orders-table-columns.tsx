"use client"

import { SortingHeader } from "@/components/data-table";
import { OrderStatus } from "@/components/order-status";
import { OrderDto } from "@/dtos/orders/order.dto";
import { formatDateAndTime } from "@/utils/dates";
import { calculateOrderTotal } from "@/utils/order";
import { formatPrice } from "@/utils/price";
import { ColumnDef } from "@tanstack/react-table";

export const ORDER_COLUMNS: ColumnDef<OrderDto>[] = [
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <SortingHeader column={column}>
          סטאטוס
        </SortingHeader>
      )
    },
    cell: ({ row }) => {
      return (
        <OrderStatus order={row.original} />
      );
    },
  },
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
    accessorKey: "customer.name",
    header: ({ column }) => {
      return (
        <SortingHeader column={column}>
          מספר הזמנה
        </SortingHeader>
      )
    },
    cell: ({ row }) => {
      return (
        <span>{`${row.original.customer.firstName} ${row.original.customer.lastName}`}</span>
      );
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
      return (
        <span>{formatDateAndTime(row.original.createdAt)}</span>
      );
    },
  },
  {
    accessorKey: "itemsCount",
    header: ({ column }) => {
      return (
        <SortingHeader column={column}>
          פריטים
        </SortingHeader>
      )
    },
    cell: ({ row }) => {
      return (
        <span>{row.original.orderItems.length}</span>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => {
      return (
        <SortingHeader column={column}>
          סה״כ
        </SortingHeader>
      )
    },
    cell: ({ row }) => {
      return (
        <span>{formatPrice(calculateOrderTotal(row.original))}</span>
      );
    },
  },
]