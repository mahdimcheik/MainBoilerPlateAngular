/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Booking } from './Booking';
import type { EnumSlotType } from './EnumSlotType';
import type { UserApp } from './UserApp';
export type Slot = {
    id?: string;
    startAt?: string;
    endAt?: string;
    createdAt?: string;
    createdById?: string | null;
    creator?: UserApp;
    booking?: Booking;
    price?: number;
    reduction?: number | null;
    type?: EnumSlotType;
};

