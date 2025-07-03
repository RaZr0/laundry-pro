export function formatPrice(price: number): string {
    return new Intl.NumberFormat('he-IL', {
        style: 'currency',
        currency: 'ILS',
    }).format(price);
}