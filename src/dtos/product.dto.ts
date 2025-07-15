import { PriceUnitDto } from "./price-unit.dto";
import { ServiceCategoryDto } from "./service-category.dto";

export type ProductDto = {
    id: string;
    name: string;
    price: number;
    imageUrl?: string | null;
    serviceCategory: ServiceCategoryDto;
    priceUnit?: PriceUnitDto | null;
    createdAt: Date;
}

export type CreateProductDto = {
    name: string;
    price: number;
    serviceCategoryId: string;
    priceUnitId: string;
    imageUrl?: string | null;
}