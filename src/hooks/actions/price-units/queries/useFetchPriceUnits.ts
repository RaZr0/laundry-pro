import { PriceUnitDto } from "@/dtos/price-unit.dto";
import { useQuery } from "@tanstack/react-query";
import { PRICE_UNITS_API_URL } from "../api-urls";

async function fetchPriceUnits(): Promise<PriceUnitDto[]> {
    try{
        const res = await fetch(PRICE_UNITS_API_URL);
        return res.json();
    }
    catch (error) {
        throw error;
    }
}

export function useFetchPriceUnits() {
    const query = useQuery({
        queryKey: [PRICE_UNITS_API_URL],
        queryFn: fetchPriceUnits,
        enabled: true,
    });

    return query;
}