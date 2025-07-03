"use client"

import { Button } from "@/components/ui/button";
import { Column, ColumnDef } from "@tanstack/react-table";
import { Customer } from "../../types/customer";
import { CustomerIcon } from "../customer-icon";
import { LastOrder } from "../last-order";
import { TotalOrdersPrice } from "../total-orders-price";
import { Order } from "../../types/order";

function SortingHeader({ column, children }: { column: Column<Customer>, children?: React.ReactNode }) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {children}
    </Button>
  )
}


export const CUSTOMER_COLUMNS: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <SortingHeader column={column}>
          לקוח
        </SortingHeader>
      )
    },
    cell: ({ row }) => {
      const name = row.original.name;
      return <div className="flex items-center gap-2">
        <CustomerIcon />
        <span>{name}</span>
      </div>;
    },
  },
  {
    accessorKey: "contact",
    header: ({ column }) => {
      return (
        <SortingHeader column={column}>
          פרטי קשר
        </SortingHeader>
      )
    },
    cell: ({ row }) => {
      const email = row.original.email;
      const phone = row.original.phone;
      return <div className="flex flex-col">
        <span>{email}</span>
        <span className="text-muted-foreground">{phone}</span>
      </div>;
    },
    sortingFn: (rowA, rowB) => {
      const emailA = rowA.original.email.toLowerCase();
      const emailB = rowB.original.email.toLowerCase();
      return emailA.localeCompare(emailB);
    }
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <SortingHeader column={column}>
          כתובת
        </SortingHeader>
      )
    },
  },
  {
    accessorKey: "ordersTotal",
    header: ({ column }) => {
      return (
        <SortingHeader column={column}>
          חובות וזיכויים
        </SortingHeader>
      )
    },
    cell: ({ row }) => {
      return <TotalOrdersPrice orders={row.original.orders} />;
    },
    sortingFn: (rowA, rowB) => {
      function total(orders : Order[]){
        return orders.reduce((total, order) => total + (order.paid ? order.total : -order.total), 0)
      }
      const totalA = total(rowA.original.orders);
      const totalB = total(rowB.original.orders);
      return totalA - totalB;
    }
  },
  {
    accessorKey: "ordersCount",
    header: ({ column }) => {
      return (
        <SortingHeader column={column}>
          הזמנות
        </SortingHeader>
      )
    },
    cell: ({ row }) => {
      return <span>{row.original.orders.length}</span>;
    },
    sortingFn: (rowA, rowB) => {
      return rowA.original.orders.length - rowB.original.orders.length;
    }
  },
  {
    accessorKey: "lastOrderDate",
     header: ({ column }) => {
      return (
        <SortingHeader column={column}>
          הזמנה אחרונה
        </SortingHeader>
      )
    },
    cell: ({ row }) => <LastOrder orders={row.original.orders} />,
    sortingFn: (rowA, rowB) => {
      function sortOrdersByDate(orders: Order[]) {
        return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
      const lastOrderA = sortOrdersByDate(rowA.original.orders)[0];
      const lastOrderB = sortOrdersByDate(rowB.original.orders)[0];
      return (lastOrderA?.createdAt.getTime() || 0) - (lastOrderB?.createdAt.getTime() || 0);
    }
  },
]