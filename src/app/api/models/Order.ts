/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Booking } from './Booking';
import type { EnumBookingStatus } from './EnumBookingStatus';
import type { UserApp } from './UserApp';
export type Order = {
    id?: string;
    orderNumber?: string | null;
    paymentDate?: string | null;
    checkoutID?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    status?: EnumBookingStatus;
    paymentMethod?: string | null;
    bookings?: Array<Booking> | null;
    booker?: UserApp;
    bookerId?: string | null;
    tvaRate?: number;
    paymentIntent?: string | null;
    checkoutExpiredAt?: string | null;
};

