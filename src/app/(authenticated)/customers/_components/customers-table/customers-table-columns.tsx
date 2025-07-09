"use client"

import { ColumnDef } from "@tanstack/react-table";
import { CustomerIcon } from "../customer-icon";
import { LastOrder } from "../last-order";
import { CustomerBalance } from "../customer-balance";
import { SortingHeader } from "@/components/data-table";
import { Address } from "@/components/address";
import { calculateOrdersTotal } from "@/utils/order";
import { CustomerDto } from "@/dtos/customers/customer.dto";
import { OrderDto } from "@/dtos/orders/order.dto";

export const CUSTOMER_COLUMNS: ColumnDef<CustomerDto>[] = [
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
      const name = `${row.original.firstName} ${row.original.lastName}`;
      const customerNumber = row.original.customerNumber;
      return <div className="flex items-center gap-2">
        <CustomerIcon />
        <div className="flex flex-col">
          <span>{name}</span>
          <span className="text-muted-foreground">{customerNumber}</span>
        </div>
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
      const emailA = rowA.original.email?.toLowerCase();
      const emailB = rowB.original.email?.toLowerCase();

      if(!emailA){
        return 1;
      }

      if(!emailB){
        return -1;
      }

      return emailA?.localeCompare(emailB);
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
    cell: ({ row }) => {
      return <Address data={row.original} />;
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
      return <CustomerBalance orders={row.original.orders} />;
    },
    sortingFn: (rowA, rowB) => {
      const totalA = calculateOrdersTotal(rowA.original.orders);
      const totalB = calculateOrdersTotal(rowB.original.orders);
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
      function sortOrdersByDate(orders: OrderDto[]) {
        return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
      const lastOrderA = sortOrdersByDate(rowA.original.orders)[0];
      const lastOrderB = sortOrdersByDate(rowB.original.orders)[0];
      return (lastOrderA?.createdAt.getTime() || 0) - (lastOrderB?.createdAt.getTime() || 0);
    }
  },
]