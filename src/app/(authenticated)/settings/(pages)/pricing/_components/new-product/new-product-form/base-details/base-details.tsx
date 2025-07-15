import { FormSectionWrapper } from "@/components/form-section-wrapper";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext, UseFormReturn } from "react-hook-form";
import z from "zod";
import { FormSchema } from "../schema/schema";
import { Dropdown } from "@/components/dropdown";
import { useFetchServiceCategories } from "@/hooks/actions/service-categories/queries/useFetchServiceCategories";
import { useMemo } from "react";
import { useFetchPriceUnits } from "@/hooks/actions/price-units/queries/useFetchPriceUnits";

export function BaseDetails({ form }: { form: UseFormReturn<z.infer<typeof FormSchema>> }) {
    const { data: serviceCategories } = useFetchServiceCategories();
    const { data: priceUnits } = useFetchPriceUnits();
    const { setValue } = useFormContext();

    const serviceCategoriesOptions = useMemo(
        () => serviceCategories?.map(category => ({
            id: category.id,
            label: category.name,
        })) || [],
        [serviceCategories]
    );

    const priceUnitsOptions = useMemo(
        () => priceUnits?.map(priceUnit => ({
            id: priceUnit.id,
            label: priceUnit.description,
        })) || [],
        [priceUnits]
    );

    return (
        <FormSectionWrapper title="פרטי מוצר">
            <div className="flex flex-col gap-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <div>
                                    שם השירות / המוצר <span className="text-destructive">*</span>
                                </div>
                            </FormLabel>
                            <FormControl>
                                <Input {...field} autoComplete="new-password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="serviceCategoryId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                קטגוריה
                            </FormLabel>
                            <FormControl>
                                <Dropdown {...field} options={serviceCategoriesOptions} defaultOption={serviceCategoriesOptions[0]} onSelected={(option) => setValue('serviceCategoryId', option?.id, { 
                                    shouldDirty: true,
                                    shouldTouch: true,
                                    shouldValidate: true,
                                })} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="priceUnitId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                יחידת חיוב
                            </FormLabel>
                            <FormControl>
                                <Dropdown {...field} options={priceUnitsOptions} defaultOption={priceUnitsOptions[0]} onSelected={(option) => setValue('priceUnitId', option?.id , {
                                    shouldDirty: true,
                                    shouldTouch: true,
                                    shouldValidate: true,
                                })} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <div>
                                    מחיר בסיס (₪) <span className="text-destructive">*</span>
                                </div>
                            </FormLabel>
                            <FormControl>
                                <Input {...field} autoComplete="new-password" type="number" min={0} onChange={(e) => {
                                    field.onChange(e.target.value !== "" ? Number(e.target.value) : undefined)
                                }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </FormSectionWrapper>
    );
}