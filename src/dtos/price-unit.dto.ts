enum PriceUnitType {
    KG = 1,
    ITEM = 2,
}

export type PriceUnitDto = {
    id: string;
    description: string;
    type: PriceUnitType;
    createdAt: Date;
    updatedAt: Date;
}