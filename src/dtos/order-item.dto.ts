import { ProductDto } from "./product.dto";

export type OrderItemDto = {
    id: string;
    price: number;
    quantity: number;
    notes?: string;
    product: ProductDto;
    createdAt: Date;
}