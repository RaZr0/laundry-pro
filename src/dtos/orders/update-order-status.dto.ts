import { OrderStatusDto } from "./order.dto";

export type UpdateOrderStatusDto = {
    orderNumber: string;
    status: OrderStatusDto;
}