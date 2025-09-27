/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EnumNotificationType } from './EnumNotificationType';
export type NotificationResponseDTO = {
    id?: string;
    description?: string | null;
    type?: EnumNotificationType;
    isRead?: boolean;
    createdAt?: string;
    senderId?: string | null;
    recipientId?: string | null;
    bookingId?: string | null;
    orderId?: string | null;
};

