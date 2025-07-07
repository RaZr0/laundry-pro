import { ServiceCategory } from "./service-category";

export type Product = {
    id: string;
    name: string;
    price: number;
    priceUnit: string;
    serviceCategory: ServiceCategory;
    createdAt: Date;
}