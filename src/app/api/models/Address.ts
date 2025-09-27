/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddressTypeEnum } from './AddressTypeEnum';
import type { UserApp } from './UserApp';
export type Address = {
    id?: string;
    streetNumber: number;
    street: string;
    streetLine2?: string | null;
    city: string;
    state?: string | null;
    postalCode: string;
    country: string;
    userId?: string | null;
    user?: UserApp;
    addressType?: AddressTypeEnum;
};

