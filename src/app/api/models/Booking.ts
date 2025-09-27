/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChatMessage } from './ChatMessage';
import type { EnumTypeHelp } from './EnumTypeHelp';
import type { Order } from './Order';
import type { Slot } from './Slot';
import type { UserApp } from './UserApp';
export type Booking = {
    id?: string;
    slotId?: string;
    slot?: Slot;
    bookedById?: string | null;
    booker?: UserApp;
    createdAt?: string;
    orderId?: string | null;
    order?: Order;
    subject?: string | null;
    description?: string | null;
    typeHelp?: EnumTypeHelp;
    communications?: Array<ChatMessage> | null;
};

