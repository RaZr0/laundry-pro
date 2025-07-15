import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import z from "zod";
import { FormSectionWrapper } from "../../../../../../components/form-section-wrapper";
import { FormSchema } from "./schema/schema";
import { Card } from "@/components/ui/card";

export function MarketingAndNotifications({ form }: { form: UseFormReturn<z.infer<typeof FormSchema>> }) {
    return <FormSectionWrapper title="שיווק והתראות">
        <div className="flex flex-col gap-4">
            <FormField
                control={form.control}
                name="joinMarketing"
                render={({ field }) => (
                    <FormItem className="flex">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked)} />
                        </FormControl>
                        <FormLabel>הצטרף להודעות שיווקיות ב SMS/דוא״ל</FormLabel>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="sendReminders"
                render={({ field }) => (
                    <FormItem className="flex">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked)} />
                        </FormControl>
                        <FormLabel>שלח התראות תזכורת</FormLabel>
                    </FormItem>
                )}
            />
        </div>
        <Card className="bg-muted/50 gap-2">
            <h3 className="font-medium">סוגי התראות</h3>
            <ul className="flex flex-col gap-2">
                <li>
                    <FormField
                        control={form.control}
                        name="orderAcceptedAlert"
                        render={({ field }) => (
                            <FormItem className="flex">
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked)} />
                                </FormControl>
                                <FormLabel>הזמנה התקבלה</FormLabel>
                            </FormItem>
                        )}
                    />
                </li>
                <li>
                    <FormField
                        control={form.control}
                        name="orderInProgressAlert"
                        render={({ field }) => (
                            <FormItem className="flex">
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked)} />
                                </FormControl>
                                <FormLabel>הזמנה בטיפול</FormLabel>
                            </FormItem>
                        )}
                    />
                </li>
                 <li>
                    <FormField
                        control={form.control}
                        name="orderReadyAlert"
                        render={({ field }) => (
                            <FormItem className="flex">
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked)} />
                                </FormControl>
                                <FormLabel>הזמנה מוכנה לאיסוף</FormLabel>
                            </FormItem>
                        )}
                    />
                </li>
                   <li>
                    <FormField
                        control={form.control}
                        name="orderDeliveredAlert"
                        render={({ field }) => (
                            <FormItem className="flex">
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked)} />
                                </FormControl>
                                <FormLabel>עדכוני משלוח</FormLabel>
                            </FormItem>
                        )}
                    />
                </li>
            </ul>
        </Card>
    </FormSectionWrapper>
}