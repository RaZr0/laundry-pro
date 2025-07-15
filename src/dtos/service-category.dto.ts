export type ServiceCategoryDto = {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateServiceCategoryDto = {
    name: string;
}