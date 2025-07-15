import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductDto } from "@/dtos/product.dto";
import { ServiceCategoryDto } from "@/dtos/service-category.dto";
import { ProductsTable } from "./products-table/products-table";

type ServiceCategoryManagerProps = {
    serviceCategories?: ServiceCategoryDto[];
    products?: ProductDto[];
}

export function ProductsCategoriesManager({ serviceCategories, products }: ServiceCategoryManagerProps) {

    if (!products || !serviceCategories) {
        return <Skeleton className="h-[400px] w-full" />;
    }

    if (!serviceCategories.length) {
        return <div className="text-center">אנא הוסף קטגוריות מוצרים</div>;
    }

    return (
        <div className="flex w-full flex-col gap-6">
            <Tabs defaultValue={serviceCategories[0]?.name} className="flex flex-col gap-3">
                <TabsList>
                    {serviceCategories.map((category) => (
                        <TabsTrigger key={category.id} value={category.name}>{category.name}</TabsTrigger>
                    ))}
                </TabsList>
                {serviceCategories.map((category) => (
                    <TabsContent key={category.id} value={category.name}>
                        <ProductsTable data={products.filter(product => product.serviceCategory.id === category.id)} className="!border-0" />
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}