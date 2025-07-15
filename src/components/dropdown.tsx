'use client';

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";

function FilterInput({ initialValue, onFilterChange, filterPlaceholder }: { initialValue?: string, filterPlaceholder?: string, onFilterChange: (value: string) => void }) {
    return (<div className="p-2">
        <Input placeholder={filterPlaceholder || 'חפש...'} onChange={(e) => onFilterChange(e.target.value)} defaultValue={initialValue} />
    </div>
    );
}

function FilteredResults({ data, onSelect, selectedOption }: { data?: Option[], onSelect?: (option: Option) => void, selectedOption?: Option }) {
    if (!data) {
        return <DropdownMenuItem className="px-6">בטעינה...</DropdownMenuItem>;
    }

    if (!data.length) {
        return <DropdownMenuItem className="px-6">לא נמצאו תוצאות</DropdownMenuItem>;
    }

    return (
        <>
            {data.map((option) => {
                const isSelected = selectedOption?.id === option.id;
                return (<DropdownMenuItem key={option.id} className={cn('relative flex gap-2 px-8 !cursor-pointer', isSelected ? 'text-[var(--accent-foreground)] bg-[var(--accent)]' : '')} onClick={() => onSelect?.(option)}>
                    <div>
                        {isSelected && <Check className="absolute top-1/2 left-2 transform -translate-y-1/2" />}
                        <span>{option.label}</span>
                    </div>

                </DropdownMenuItem>)
            }

            )}
        </>
    )
}

type Option = {
    id: string;
    label: ReactNode | string;
    value?: unknown;
}

type DropdownProps = {
    options?: Option[];
    defaultOption?: Option;
    onSelected?: (option: Option | undefined) => void;
    filter?: boolean;
    filterFunction?: (value: string, option: Option) => boolean;
    selectPlaceholder?: string;
    filterPlaceholder?: string;
    width?: number;
}

export function Dropdown({ options, defaultOption, onSelected, filter, filterFunction, selectPlaceholder, filterPlaceholder, width }: DropdownProps) {
    const triggerRef = useRef<HTMLButtonElement>(null)
    const [filteredResults, setFilteredResults] = useState<Option[] | undefined>(options);
    const [filterValue, setFilterValue] = useState('');
    const [selectedOption, setSelectedOption] = useState<Option | undefined>(defaultOption);

    useEffect(() => {
        setFilteredResults(options);
    }, [options]);

    useEffect(() => {
        if (defaultOption) {
           onOptionSelected(defaultOption);
        };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultOption])

    function onOptionSelected(option: Option | undefined) {
        setSelectedOption(option);
        onSelected?.(option);
    }

    function onFilterInputChanged(value: string) {
        setFilterValue(value);
        const filteredResults = options?.filter(option => filterFunction ? filterFunction(value, option) : (typeof option.label === 'string' ? option.label.toLowerCase().includes(value.toLowerCase()) : true));
        setFilteredResults(filteredResults);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button ref={triggerRef} variant="outline" className='flex justify-between' style={{
                    width: width ? `${width}px` : '100%'
                }}>
                    {selectedOption ? selectedOption.label : (selectPlaceholder || 'בחר')}
                    <ChevronDown className="opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='flex flex-col' style={{
                width: width ? `${width}px` : triggerRef?.current?.offsetWidth
            }}>
                {filter && <FilterInput initialValue={filterValue} onFilterChange={onFilterInputChanged} filterPlaceholder={filterPlaceholder} />}
                <DropdownMenuGroup>
                    <FilteredResults data={filteredResults} onSelect={onOptionSelected} selectedOption={selectedOption} />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}