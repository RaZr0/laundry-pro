type AddressProps = {
    city?: string | null;
    street?: string | null;
}

export function Address({ city, street }: AddressProps) {
    return (
        <span>{`${street}, ${city}`}</span>
    );
}