'use client';

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { CustomerDto } from "@/dtos/customers/customer.dto";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const DROPDOWN_WIDTH = 250;

function FilterInput({ initialValue, onFilterChange }: { initialValue?: string, onFilterChange: (value: string) => void }) {
    return (<div className="p-2">
        <Input placeholder="חפש לקוח..." onChange={(e) => onFilterChange(e.target.value)} defaultValue={initialValue} />
    </div>
    );
}

function FilteredResults({ data, onSelect, selectedCustomer }: { data?: CustomerDto[], onSelect?: (customer: CustomerDto) => void, selectedCustomer?: CustomerDto }) {
    if (!data) {
        return <DropdownMenuItem className="px-6">בטעינה...</DropdownMenuItem>;
    }

    if (!data.length) {
        return <DropdownMenuItem className="px-6">לא נמצאו תוצאות</DropdownMenuItem>;
    }

    return (
        <>
            {data.map((customer) => {
                const isSelected = selectedCustomer?.id === customer.id;
                return (<DropdownMenuItem key={customer.id} className={cn('relative flex gap-2 px-8 !cursor-pointer', isSelected ? 'text-[var(--accent-foreground)] bg-[var(--accent)]' : '')} onClick={() => onSelect?.(customer)}>
                    <div>
                        {isSelected && <Check className="absolute top-1/2 left-2 transform -translate-y-1/2" />}
                        <span>{`${customer.firstName} ${customer.lastName}`}</span>
                    </div>

                </DropdownMenuItem>)
            }

            )}
        </>
    )
}

type CustomerPickerProps = {
    customers?: CustomerDto[];
    onSelected?: (customer: CustomerDto) => void;
}

export function CustomerPicker({ customers, onSelected }: CustomerPickerProps) {
    const [filteredResults, setFilteredResults] = useState<CustomerDto[] | undefined>(customers);
    const [filterValue, setFilterValue] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState<CustomerDto>();

    useEffect(() => {
        setFilteredResults(customers);
    }, [customers]);

    function onCustomerSelected(customer: CustomerDto) {
        setSelectedCustomer(customer);
        onSelected?.(customer);
    }

    function onFilterInputChanged(value: string) {
        setFilterValue(value);
        const filteredResults = customers?.filter(customer => `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(value.toLowerCase()));
        setFilteredResults(filteredResults);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className='flex justify-between' style={{
                    width: `${DROPDOWN_WIDTH}px`
                }}>
                    {selectedCustomer ? `${selectedCustomer.firstName} ${selectedCustomer.lastName}` : 'בחר לקוח'}
                    <ChevronDown className="opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='flex flex-col' style={{
                width: `${DROPDOWN_WIDTH}px`
            }}>
                <FilterInput initialValue={filterValue} onFilterChange={onFilterInputChanged} />
                <DropdownMenuGroup>
                    <FilteredResults data={filteredResults} onSelect={onCustomerSelected} selectedCustomer={selectedCustomer} />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}