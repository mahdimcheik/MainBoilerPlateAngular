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
export type UserApp = {
    id?: string | null;
    userName?: string | null;
    normalizedUserName?: string | null;
    email?: string | null;
    normalizedEmail?: string | null;
    emailConfirmed?: boolean;
    passwordHash?: string | null;
    securityStamp?: string | null;
    concurrencyStamp?: string | null;
    phoneNumber?: string | null;
    phoneNumberConfirmed?: boolean;
    twoFactorEnabled?: boolean;
    lockoutEnd?: string | null;
    lockoutEnabled?: boolean;
    accessFailedCount?: number;
    firstName?: string | null;
    lastName?: string | null;
    gender?: EnumGender;
    imgUrl?: string | null;
    description?: string | null;
    title?: string | null;
    linkedinUrl?: string | null;
    githubUrl?: string | null;
    dateOfBirth?: string;
    createdAt?: string;
    lastModifiedAt?: string;
    lastLogginAt?: string | null;
    isBanned?: boolean | null;
    bannedUntilDate?: string | null;
    adresses?: Array<Address> | null;
    slots?: Array<Slot> | null;
    bookings?: Array<Booking> | null;
    formations?: Array<Formation> | null;
    notificationsRecieved?: Array<Notification> | null;
    notificationsCreated?: Array<Notification> | null;
    orders?: Array<Order> | null;
};

