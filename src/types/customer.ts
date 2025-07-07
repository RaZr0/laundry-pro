import { Order } from "./order";

export type Customer = {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string | null;
    city: string | null;
    street: string | null;
    postalCode: string | null;
    apartmentFloor: number | null;
    apartmentNumber: number | null;
    apartmentEntrance: string | null;
    apartmentEntryCode: string | null;
    prefrencesNotes: string | null;
    joinMarketing: boolean;
    sendReminders: boolean;
    orderAcceptedAlert: boolean;
    orderInProgressAlert: boolean;
    orderReadyAlert: boolean;
    orderDeliveredAlert: boolean;
    orders: Order[];
}