'use client';

import { Form } from "@/components/ui/form";
import { CustomerDto } from "@/dtos/customers/customer.dto";
import { ProductDto } from "@/dtos/product.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { formSchema, FormValues } from "../schema";
import { CustomerDetails } from "./customer-details/customer-details";
import { OrderItems } from "./order-items/order-items";
import { OrderSummary } from "./order-summary/order-summary";
import { ProductsSelection } from "./products-selection/products-selection";

type NewOrderViewProps = {
    onSubmit?: (data: FormValues) => void;
}

export function NewOrderView({ onSubmit }: NewOrderViewProps) {
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
        form.setValue('customerId', customer.id , {
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

    function handleSubmit(data: FormValues){
        onSubmit?.(data);
    };

    return (
        <FormProvider {...form}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="grid lg:grid-cols-[2fr_1fr] gap-6">
                    <div className="flex flex-col gap-6">
                        <CustomerDetails onSelectedCustomer={onSelectedCustomer} />
                        <ProductsSelection onSelectedProduct={onSelectedProduct} />
                        <OrderItems items={orderItems} onRemove={onRemoveItem} />
                    </div>
                    <div>
                        <OrderSummary items={orderItems} />
                    </div>
                </form>
            </Form>
        </FormProvider>
    );
}