import { OrderStatusDto } from "./order.dto";

export type UpdateOrderStatusDto = {
    id: string;
    status: OrderStatusDto;
}