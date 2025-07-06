import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormSectionWrapper } from "./form-section-wrapper";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import z from "zod";
import { useMask } from "@react-input/mask";
import { FormSchema } from "./schema/schema";

function PhoneInput({ form }: { form: UseFormReturn<z.infer<typeof FormSchema>> }) {
    const inputRef = useMask({
        mask: '+972 __ ___-____',
        replacement: { _: /\d/ },
    });

    return <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (<FormItem>
            <FormLabel>מספר טלפון*</FormLabel>
            <FormControl>
                <Input placeholder="+972 50-123-4567" {...field} ref={inputRef} autoComplete="new-password" className="text-end" style={{
                    direction: 'ltr',
                }}/>
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
            
            <PhoneInput form={form}/>
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