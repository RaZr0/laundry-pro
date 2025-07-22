import { CustomerDto } from "../customers/customer.dto";
import { OrderItemDto } from "../order-item.dto";
import { UserDto } from "../users/user.dto";

export type OrderStatusDto = "in_progress" | "ready" | "completed" | "in_delivery" | "cancelled";

export type OrderDto = {
  id: string;
  orderNumber: string;
  createdAt: Date;
  updatedAt: Date;
  paid: boolean;
  status: OrderStatusDto;
  orderItems: OrderItemDto[];
  customer: CustomerDto;
  user: UserDto;
}
