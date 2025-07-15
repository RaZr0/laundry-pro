import { FormSectionWrapper } from "@/components/form-section-wrapper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";
import z from "zod";
import { FormSchema } from "../schema/schema";

const IMAGES: string[] = [
    "bedding.png",
    "coat.png",
    "detergent.png",
    "dress.png",
    "fabric-softener.png",
    "pants.png",
    "shirt.png",
    "suit.png",
];

const getImageUrl = (image: string): string => `/images/products/${image}`;

export function ImageSelection({ form }: { form: UseFormReturn<z.infer<typeof FormSchema>> }) {

    function isSelected(image: string): boolean {
        return form.watch('imageUrl') === getImageUrl(image);
    }
    
    return (
        <FormSectionWrapper title="תמונת פריט">
            <div className="flex flex-col gap-2">
                <span className="font-semibold">בחירה מספרייה</span>
                <ul className="flex flex-wrap gap-4">
                    {IMAGES.map((image, index) => (
                        <li key={index}>
                            <Button type="button" variant="outline" className={cn('h-auto', isSelected(image) ? "border-3 border-primary" : '')} onClick={() => {
                                form.setValue("imageUrl", getImageUrl(image) , {
                                    shouldDirty: true,
                                    shouldTouch: true,
                                    shouldValidate: true,
                                })
                            }}>
                                <Image src={getImageUrl(image)} alt='product-image' width={100} height={100} />
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </FormSectionWrapper>
    );
}