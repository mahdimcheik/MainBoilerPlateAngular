/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookingResponseDTO } from './BookingResponseDTO';
import type { EnumBookingStatus } from './EnumBookingStatus';
import type { UserResponseDTO } from './UserResponseDTO';
export type OrderResponseForTeacherDTO = {
    id?: string;
    orderNumber?: string | null;
    paymentDate?: string | null;
    createdAt?: string | null;
    status?: EnumBookingStatus;
    paymentMethod?: string | null;
    bookings?: Array<BookingResponseDTO> | null;
    booker?: UserResponseDTO;
    totalOriginalPrice?: number;
    totalDiscountedPrice?: number;
    totalReduction?: number;
    paymentIntent?: string | null;
    updatedAt?: string | null;
};

