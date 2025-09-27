/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EnumGender } from './EnumGender';
export type UserUpdateDTO = {
    id: string;
    firstName: string;
    lastName: string;
    linkedinUrl?: string | null;
    githubUrl?: string | null;
    phoneNumber?: string | null;
    description?: string | null;
    title?: string | null;
    dateOfBirth: string;
    gender: EnumGender;
};

