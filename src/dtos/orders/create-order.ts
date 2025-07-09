type OrderItemDto = {
    productId: string;
    quantity: number;
    notes?: string;
}

export type CreateOrderDto = {
    customerId: string;
    notes?: string;
    orderItems: OrderItemDto[];
}