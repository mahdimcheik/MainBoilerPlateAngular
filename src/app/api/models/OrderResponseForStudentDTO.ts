/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookingResponseDTO } from './BookingResponseDTO';
import type { EnumBookingStatus } from './EnumBookingStatus';
import type { TimespanDTO } from './TimespanDTO';
export type OrderResponseForStudentDTO = {
    id?: string;
    orderNumber?: string | null;
    paymentDate?: string | null;
    createdAt?: string | null;
    status?: EnumBookingStatus;
    paymentMethod?: string | null;
    bookings?: Array<BookingResponseDTO> | null;
    totalOriginalPrice?: number;
    totalDiscountedPrice?: number;
    totalReduction?: number;
    paymentIntent?: string | null;
    checkoutID?: string | null;
    checkoutExpiredAt?: string | null;
    updatedAt?: string | null;
    leftTimeToPay?: TimespanDTO;
};

