import { Product } from "./product";

export type OrderItem = {
    id: string;
    quantity: number;
    notes?: string;
    product: Product;
    createdAt: Date;
}