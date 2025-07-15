import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { format, useMask } from "@react-input/mask";
import { UseFormReturn } from "react-hook-form";
import z from "zod";
import { FormSectionWrapper } from "../../../../../../components/form-section-wrapper";
import { FormSchema } from "./schema/schema";

const options = {
    mask: '___-___-____',
    replacement: { _: /\d/ },
};

function PhoneInput({ form }: { form: UseFormReturn<z.infer<typeof FormSchema>> }) {
    const inputRef = useMask(options);
    const defaultValue = format(form.getValues('phone'), options);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const maskedValue = e.target.value;
        const digitsOnly = maskedValue.replace(/\D/g, '');
        form.setValue('phone', digitsOnly, { shouldTouch: true, shouldDirty: true, shouldValidate: true });
    };

    return <FormField
        control={form.control}
        name="phone"
        render={({ }) => (<FormItem>
            <FormLabel>מספר טלפון*</FormLabel>
            <FormControl>
                <Input placeholder="050-123-4567" type="tel"
                    defaultValue={defaultValue}
                    ref={inputRef} autoComplete="new-password" className="text-end" style={{
                        direction: 'ltr',
                    }}
                    onChange={handleChange}
                />
            </FormControl>
            <FormMessage />
        </FormItem>
        )}
    />
}

export function GeneralDetails({ form }: { form: UseFormReturn<z.infer<typeof FormSchema>> }) {
    return <FormSectionWrapper title="מידע בסיסי">
        <div className="grid grid-cols-2 gap-4 items-baseline">
            <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>שם פרטי*</FormLabel>
                        <FormControl>
                            <Input placeholder="ישראל" {...field} autoComplete="new-password" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>שם משפחה*</FormLabel>
                        <FormControl>
                            <Input placeholder="ישראלי" {...field} autoComplete="new-password" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <PhoneInput form={form} />
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>דוא״ל</FormLabel>
                        <FormControl>
                            <Input placeholder="customer@example.com" {...field} autoComplete="new-password" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>

    </FormSectionWrapper>
}