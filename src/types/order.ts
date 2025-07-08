import { Customer } from "./customer";
import { OrderItem } from "./order-item";

export type OrderStatus = "in_progress" | "ready" | "completed" | "in_delivery" | "cancelled";

export type OrdersSummary = {
    total: number;
    inProgress: number;
    ready: number;
    completed: number;
}

export type Order = {
  id: string;
  orderNumber: string;
  createdAt: Date;
  updatedAt: Date;
  paid: boolean;
  status: OrderStatus;
  orderItems: OrderItem[];
  customer: Customer;
}
