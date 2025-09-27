/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChatMessage } from './ChatMessage';
import type { EnumBookingStatus } from './EnumBookingStatus';
import type { EnumSlotType } from './EnumSlotType';
import type { EnumTypeHelp } from './EnumTypeHelp';
export type SlotResponseDTO = {
    id?: string;
    startAt?: string;
    endAt?: string;
    createdAt?: string;
    createdById?: string | null;
    price?: number;
    discountedPrice?: number | null;
    reduction?: number | null;
    type?: EnumSlotType;
    studentId?: string | null;
    studentFirstName?: string | null;
    studentLastName?: string | null;
    studentImgUrl?: string | null;
    subject?: string | null;
    description?: string | null;
    typeHelp?: EnumTypeHelp;
    status?: EnumBookingStatus;
    communications?: Array<ChatMessage> | null;
};

