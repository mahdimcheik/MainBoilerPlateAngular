/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EnumBookingStatus } from './EnumBookingStatus';
export type OrderPagination = {
    start?: number;
    perPage?: number;
    fromDate?: string | null;
    toDate?: string | null;
    status?: EnumBookingStatus;
    bookerId?: string | null;
    orderByDate?: number | null;
    searchField?: string | null;
};

