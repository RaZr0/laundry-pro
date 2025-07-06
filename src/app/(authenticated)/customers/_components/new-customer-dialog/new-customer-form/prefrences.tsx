import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { TextArea } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import z from "zod";
import { FormSectionWrapper } from "./form-section-wrapper";
import { FormSchema } from "./schema/schema";

export function Prefrences({ form }: { form: UseFormReturn<z.infer<typeof FormSchema>> }) {
    return <FormSectionWrapper title="העדפות לקוח">
        <FormField
            control={form.control}
            name="prefrencesNotes"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>הערות לקוח</FormLabel>
                    <FormControl>
                        <TextArea placeholder="Special washing instructions, delivery preferences, etc." {...field} autoComplete="new-password"/>
                    </FormControl>
                </FormItem>
            )}
        />
    </FormSectionWrapper>
}