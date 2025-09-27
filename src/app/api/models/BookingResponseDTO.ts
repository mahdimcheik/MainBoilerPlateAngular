/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChatMessage } from './ChatMessage';
import type { EnumSlotType } from './EnumSlotType';
import type { EnumTypeHelp } from './EnumTypeHelp';
export type BookingResponseDTO = {
    id?: string;
    subject?: string | null;
    description?: string | null;
    typeHelp?: EnumTypeHelp;
    orderId?: string | null;
    orderNumber?: string | null;
    createdAt?: string;
    price?: number;
    discountedPrice?: number;
    reduction?: number | null;
    slotId?: string;
    startAt?: string;
    endAt?: string;
    type?: EnumSlotType;
    studentId?: string | null;
    studentFirstName?: string | null;
    studentLastName?: string | null;
    studentImgUrl?: string | null;
    communications?: Array<ChatMessage> | null;
};

