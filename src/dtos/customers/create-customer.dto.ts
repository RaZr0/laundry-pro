export type CreateCustomerDto = {
    firstName: string;
    lastName: string;
    phone: string;
    email?: string;
    street?: string,
    city?: string;
    postalCode?: string;
    apartmentFloor?: number;
    apartmentNumber?: number;
    apartmentEntrance?: string;
    apartmentEntryCode?: string;
    prefrencesNotes?: string;
    joinMarketing: boolean;
    sendReminders: boolean;
    orderAcceptedAlert: boolean;
    orderInProgressAlert: boolean;
    orderReadyAlert: boolean;
    orderDeliveredAlert: boolean;
}