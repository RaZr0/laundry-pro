import { OrderStatusDto } from "./order.dto";

export type updateOrderStatusDto = {
    orderNumber: string;
    status: OrderStatusDto;
}