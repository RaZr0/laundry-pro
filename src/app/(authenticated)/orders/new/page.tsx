'use client'

import { Page } from "@/components/page";
import { Form } from "@/components/ui/form";
import { CustomerDto } from "@/dtos/customers/customer.dto";
import { ProductDto } from "@/dtos/product.dto";
import { useCreateOrder } from "@/hooks/actions/orders/mutations/useCreateOrder";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { CustomerDetails } from "./_components/customer-details/customer-details";
import { OrderItems } from "./_components/order-items/order-items";
import { OrderSummary } from "./_components/order-summary/order-summary";
import { ProductsSelection } from "./_components/products-selection/products-selection";
import { formSchema, FormValues } from "./schema";
import { ROUTES } from "@/app/routes";

export default function NewOrderPage() {

    const mutation = useCreateOrder();
    const router = useRouter();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            orderItems: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "orderItems",
    });

    const orderItems = form.getValues().orderItems;

    function onSelectedCustomer(customer: CustomerDto) {
        form.setValue('customerId', customer.id, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    }

    function onSelectedProduct(product: ProductDto) {
        const existsIndex = fields.findIndex(item => item.productId === product.id);
        if (existsIndex !== -1) {
            form.setValue(`orderItems.${existsIndex}.quantity`, form.watch(`orderItems.${existsIndex}.quantity`) + 1);
        }
        else {
            append({
                productId: product.id,
                productName: product.name,
                quantity: 1,
                notes: '',
                price: product.price,
                serviceCategory: product.serviceCategory.name,
            })
        }
    }

    function onRemoveItem(index: number) {
        remove(index);
    }

    async function handleSubmit(data: FormValues) {
        try {
            const res = await mutation.mutateAsync(data);
            router.push(`${ROUTES.orders.link}/${res.orderNumber}`);
        }
        catch (error) {
            console.error("Error creating order:", error);
        }
    };

    return (
        <Page title="צור הזמנה חדשה">
            <FormProvider {...form}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="grid lg:grid-cols-[2fr_1fr] gap-6">
                        <div className="flex flex-col gap-6">
                            <CustomerDetails onSelectedCustomer={onSelectedCustomer} />
                            <ProductsSelection onSelectedProduct={onSelectedProduct} />
                            <OrderItems items={orderItems} onRemove={onRemoveItem} />
                        </div>
                        <div className="sticky top-10 h-fit">
                            <OrderSummary items={orderItems} />
                        </div>
                    </form>
                </Form>
            </FormProvider>
        </Page>
    );
}