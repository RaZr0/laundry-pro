'use client';

import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useFetchProducts } from "@/hooks/actions/products/queries/useFetchProducts";
import { useFetchServiceCategories } from "@/hooks/actions/service-categories/queries/useFetchServiceCategories";
import { useDialog } from "@/providers/dialog-provider";
import { CirclePlus, Plus } from "lucide-react";
import { NewServiceCategoryDialog } from "./_components/new-service-category/new-service-category-dialog";
import { ProductsCategoriesManager } from "./_components/service-categories-manager/products-categories-manager";
import { NewProductDialog } from "./_components/new-product/new-product-dialog";

export default function PricingPage() {

    const { data: serviceCategories } = useFetchServiceCategories();
    const { data: products } = useFetchProducts();
    const { openDialog, closeDialog } = useDialog()

    function handleNewProductClick() {
        if (!serviceCategories || !serviceCategories.length) {
            openDialog(<DialogContent>
                <DialogTitle>
                    הוספת שירות
                </DialogTitle>
                <div>
                    <p className="text-center">אנא הוסף קטגוריות מוצרים לפני הוספת שירותים.</p>
                </div>
            </DialogContent>);
            return;
        }

        openDialog(<NewProductDialog onClose={() => closeDialog()} />);
    }

    function handleNewServiceCategoryClick() {
        openDialog(<NewServiceCategoryDialog onClose={() => closeDialog()} />);
    }

    return (
        <Card>
            <CardTitle>
                <div className="flex flex-col">
                    <span className="text-2xl font-semibold">תמחור ושירותים</span>
                    <span className="text-sm text-muted-foreground">נהל את השירותים שלך ומבנה התמחור</span>
                </div>
            </CardTitle>
            <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                    <Button onClick={handleNewProductClick}>
                        <CirclePlus />
                        הוספת שירות
                    </Button>
                    <Button variant="outline" onClick={handleNewServiceCategoryClick}>
                        <Plus />
                        הוספת קטגוריה
                    </Button>
                </div>
            </div>
            <div>
                <ProductsCategoriesManager serviceCategories={serviceCategories} products={products} />
            </div>
        </Card>
    );
}