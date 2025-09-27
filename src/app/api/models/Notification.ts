/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Booking } from './Booking';
import type { EnumNotificationType } from './EnumNotificationType';
import type { Order } from './Order';
import type { UserApp } from './UserApp';
export type Notification = {
    id?: string;
    description?: string | null;
    type?: EnumNotificationType;
    isRead?: boolean;
    createdAt?: string;
    senderId?: string | null;
    sender?: UserApp;
    recipientId?: string | null;
    recipient?: UserApp;
    bookingId?: string | null;
    booking?: Booking;
    orderId?: string | null;
    order?: Order;
};

