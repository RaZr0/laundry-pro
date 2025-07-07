import { Product } from "./product";

export type OrderItem = {
    id: string;
    quantity: number;
    product: Product;
    createdAt: Date;
}