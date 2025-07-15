import { ProductImagePlaceholder } from "@/components/product-image-placeholder";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductDto } from "@/dtos/product.dto";
import { ServiceCategoryDto } from "@/dtos/service-category.dto";
import { useFetchProducts } from "@/hooks/actions/products/queries/useFetchProducts";
import { useFetchServiceCategories } from "@/hooks/actions/service-categories/queries/useFetchServiceCategories";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/utils/price";
import Image from "next/image";

const PRODUCT_IAMGE_SIZE = 56;

function Product({ product, onClick }: { product: ProductDto, onClick?: () => void }) {
    const { name, price, imageUrl } = product;
    return (
        <Button type="button" variant="outline" className={cn('flex flex-col items-center gap-2 text-center p-4 max-w-[200px] min-h-[130px] whitespace-normal h-auto justify-baseline', !imageUrl ? 'justify-center' : '')} onClick={() => onClick?.()}>
            <div className="shrink-0" style={{ width: PRODUCT_IAMGE_SIZE, height: PRODUCT_IAMGE_SIZE }}>
                {imageUrl ? <Image src={imageUrl} alt="product-image" width={PRODUCT_IAMGE_SIZE} height={PRODUCT_IAMGE_SIZE} /> : <ProductImagePlaceholder />}
            </div>
            <div className="flex flex-col">
                <span className="text-sm sm:text-base font-semibold">{name}</span>
                <span className="text-xs text-muted-foreground">{formatPrice(price)}</span>
            </div>
        </Button>
    );
}

function ProductsTabs({ products, serviceCategories, onSelectedProduct }: { products?: ProductDto[], serviceCategories?: ServiceCategoryDto[], onSelectedProduct?: (product: ProductDto) => void }) {
    if (!products || !serviceCategories) {
        return (
            <div className="flex flex-col gap-4">
                <Skeleton className="h-[40px] w-full" />
                <div className="grid grid-cols-4 gap-4">
                    {Array.from({ length: 4 }, (_, i) => (
                        <Skeleton key={i} className="h-[120px]" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex w-full flex-col gap-6">
            <Tabs defaultValue={serviceCategories[0]?.name} className="flex flex-col gap-6">
                <TabsList>
                    {serviceCategories.map((category) => (
                        <TabsTrigger key={category.id} value={category.name}>{category.name}</TabsTrigger>
                    ))}
                </TabsList>
                {serviceCategories.map((category) => (
                    <TabsContent key={category.id} value={category.name} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
                        {products.filter(product => product.serviceCategory.id === category.id).map((product) => (
                            <Product key={product.id} product={product} onClick={() => onSelectedProduct?.(product)} />
                        ))}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}

type ProductsSelectionProps = {
    onSelectedProduct?: (product: ProductDto) => void;
}

export function ProductsSelection({ onSelectedProduct }: ProductsSelectionProps) {
    const { data: products } = useFetchProducts();
    const { data: serviceCategories } = useFetchServiceCategories();

    return (
        <Card>
            <CardTitle className="text-2xl">
                בחר פריטים
            </CardTitle>
            {products && products?.length === 0 ? <div className="text-muted-foreground">לא נמצאו פריטים</div> : <ProductsTabs products={products} serviceCategories={serviceCategories} onSelectedProduct={onSelectedProduct} />}
        </Card>
    );
}