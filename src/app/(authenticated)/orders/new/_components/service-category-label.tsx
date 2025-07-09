type ServiceCategoryLabelProps = {
    serviceCategory: string;
}

export function ServiceCategoryLabel({ serviceCategory }: ServiceCategoryLabelProps) {
    return (
        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            {serviceCategory}
        </span>
    );
}