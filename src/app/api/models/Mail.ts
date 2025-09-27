/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserApp } from './UserApp';
export type Mail = {
    mailTo?: string | null;
    mailSubject?: string | null;
    mailBody?: string | null;
    mailFrom?: string | null;
    sendtoSender?: boolean | null;
    sender?: UserApp;
    reciever?: UserApp;
};

