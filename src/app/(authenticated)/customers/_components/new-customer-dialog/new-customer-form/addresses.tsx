import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import z from "zod";
import { FormSectionWrapper } from "../../../../../../components/form-section-wrapper";
import { FormSchema } from "./schema/schema";

export function Addresses({ form }: { form: UseFormReturn<z.infer<typeof FormSchema>> }) {
    return <FormSectionWrapper title="כתובות">
        <div className="flex flex-col gap-4">
            <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>כתובת בית</FormLabel>
                        <FormControl>
                            <Input placeholder="רחוב הרצל 123" {...field} autoComplete="new-password" />
                        </FormControl>
                    </FormItem>
                )}
            />
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>עיר</FormLabel>
                            <FormControl>
                                <Input placeholder="תל אביב" {...field} autoComplete="new-password" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>מיקוד</FormLabel>
                            <FormControl>
                                <Input placeholder="6713701" {...field} autoComplete="new-password" />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
            <div className="grid grid-cols-4 gap-4">
                <FormField
                    control={form.control}
                    name="apartmentFloor"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>קומה</FormLabel>
                            <FormControl>
                                <Input placeholder="2" {...field} autoComplete="new-password" type="number"
                                    onChange={(e) => {
                                        field.onChange(e.target.value !== "" ? Number(e.target.value) : undefined)
                                    }} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="apartmentNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>מספר דירה</FormLabel>
                            <FormControl>
                                <Input placeholder="-1" {...field} autoComplete="new-password" type="number"
                                    onChange={(e) => {
                                        field.onChange(e.target.value !== "" ? Number(e.target.value) : undefined)
                                    }}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="apartmentEntrance"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>כניסה</FormLabel>
                            <FormControl>
                                <Input placeholder="A" {...field} autoComplete="new-password" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="apartmentEntryCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>קוד כניסה</FormLabel>
                            <FormControl>
                                <Input placeholder="1234#" {...field} autoComplete="new-password" />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
        </div>

    </FormSectionWrapper>
}