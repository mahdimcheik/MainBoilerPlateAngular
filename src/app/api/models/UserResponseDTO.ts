/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Address } from './Address';
import type { Booking } from './Booking';
import type { EnumGender } from './EnumGender';
import type { Formation } from './Formation';
import type { Notification } from './Notification';
import type { Order } from './Order';
import type { Slot } from './Slot';
export type UserResponseDTO = {
    id?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    imgUrl?: string | null;
    description?: string | null;
    title?: string | null;
    linkedinUrl?: string | null;
    githubUrl?: string | null;
    isBanned?: boolean;
    bannedUntilDate?: string | null;
    gender?: EnumGender;
    lastLogginAt?: string | null;
    dateOfBirth?: string | null;
    phoneNumber?: string | null;
    emailConfirmed?: boolean;
    roles?: Array<string> | null;
    adresses?: Array<Address> | null;
    slots?: Array<Slot> | null;
    bookings?: Array<Booking> | null;
    formations?: Array<Formation> | null;
    notifications?: Array<Notification> | null;
    orders?: Array<Order> | null;
};

