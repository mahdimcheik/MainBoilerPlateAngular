/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EnumGender } from './EnumGender';
export type UserCreateDTO = {
    email?: string | null;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string | null;
    description?: string | null;
    imgUrl?: string | null;
    title?: string | null;
    gender: EnumGender;
    dateOfBirth: string;
    linkedinUrl?: string | null;
    githubUrl?: string | null;
    privacyPolicyConsent?: boolean | null;
    dataProcessingConsent?: boolean | null;
};

