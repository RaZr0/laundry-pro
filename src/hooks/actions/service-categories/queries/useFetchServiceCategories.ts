import { ServiceCategoryDto } from "@/dtos/service-category.dto";
import { useQuery } from "@tanstack/react-query";
import { SERVICE_CATEGORIES_API_URL } from "../api-urls";

async function fetchServiceCAtegories(): Promise<ServiceCategoryDto[]> {
    try{
        const res = await fetch(SERVICE_CATEGORIES_API_URL);
        return res.json();

    }
    catch (error) {
        throw error;
    }
}

export function useFetchServiceCategories() {
    const query = useQuery({
        queryKey: [SERVICE_CATEGORIES_API_URL],
        queryFn: fetchServiceCAtegories,
        enabled: true,
    });

    return query;
}