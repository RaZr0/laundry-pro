import { OrderItem } from "./order-item";

export type OrderStatus = "pending" | "in_progress" | "completed" | "cancelled";

export type Order = {
  id: string;
  orderNumber: string;
  createdAt: Date;
  paid: boolean;
  status: OrderStatus;
  orderItems: OrderItem[];
}
