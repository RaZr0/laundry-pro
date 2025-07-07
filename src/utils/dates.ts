import { format } from "date-fns";

export function formatDate(date: Date | string): string {
    return date ? format(date, "dd/MM/yyyy") : "";
}

export function formatDateAndTime(date: Date | string): string {
    return date ? format(date, "dd/MM/yyyy, HH:mm") : "";
}