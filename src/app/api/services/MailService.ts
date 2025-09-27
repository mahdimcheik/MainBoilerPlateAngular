/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { Address } from '../models/Address';
import type { Booking } from '../models/Booking';
import type { EnumGender } from '../models/EnumGender';
import type { Formation } from '../models/Formation';
import type { Mail } from '../models/Mail';
import type { Notification } from '../models/Notification';
import type { Order } from '../models/Order';
import type { Slot } from '../models/Slot';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
@Injectable({
    providedIn: 'root',
})
export class MailService {
    constructor(public readonly http: HttpClient) {}
    /**
     * @param mailTo
     * @param mailSubject
     * @param mailBody
     * @param mailFrom
     * @param sendtoSender
     * @param senderFirstName
     * @param senderLastName
     * @param senderGender
     * @param senderImgUrl
     * @param senderDescription
     * @param senderTitle
     * @param senderLinkedinUrl
     * @param senderGithubUrl
     * @param senderDateOfBirth
     * @param senderCreatedAt
     * @param senderLastModifiedAt
     * @param senderLastLogginAt
     * @param senderIsBanned
     * @param senderBannedUntilDate
     * @param senderAdresses
     * @param senderSlots
     * @param senderBookings
     * @param senderFormations
     * @param senderNotificationsRecieved
     * @param senderNotificationsCreated
     * @param senderOrders
     * @param senderId
     * @param senderUserName
     * @param senderNormalizedUserName
     * @param senderEmail
     * @param senderNormalizedEmail
     * @param senderEmailConfirmed
     * @param senderPasswordHash
     * @param senderSecurityStamp
     * @param senderConcurrencyStamp
     * @param senderPhoneNumber
     * @param senderPhoneNumberConfirmed
     * @param senderTwoFactorEnabled
     * @param senderLockoutEnd
     * @param senderLockoutEnabled
     * @param senderAccessFailedCount
     * @param recieverFirstName
     * @param recieverLastName
     * @param recieverGender
     * @param recieverImgUrl
     * @param recieverDescription
     * @param recieverTitle
     * @param recieverLinkedinUrl
     * @param recieverGithubUrl
     * @param recieverDateOfBirth
     * @param recieverCreatedAt
     * @param recieverLastModifiedAt
     * @param recieverLastLogginAt
     * @param recieverIsBanned
     * @param recieverBannedUntilDate
     * @param recieverAdresses
     * @param recieverSlots
     * @param recieverBookings
     * @param recieverFormations
     * @param recieverNotificationsRecieved
     * @param recieverNotificationsCreated
     * @param recieverOrders
     * @param recieverId
     * @param recieverUserName
     * @param recieverNormalizedUserName
     * @param recieverEmail
     * @param recieverNormalizedEmail
     * @param recieverEmailConfirmed
     * @param recieverPasswordHash
     * @param recieverSecurityStamp
     * @param recieverConcurrencyStamp
     * @param recieverPhoneNumber
     * @param recieverPhoneNumberConfirmed
     * @param recieverTwoFactorEnabled
     * @param recieverLockoutEnd
     * @param recieverLockoutEnabled
     * @param recieverAccessFailedCount
     * @returns Mail OK
     * @throws ApiError
     */
    public postMailSend(
        mailTo?: string,
        mailSubject?: string,
        mailBody?: string,
        mailFrom?: string,
        sendtoSender?: boolean,
        senderFirstName?: string,
        senderLastName?: string,
        senderGender?: EnumGender,
        senderImgUrl?: string,
        senderDescription?: string,
        senderTitle?: string,
        senderLinkedinUrl?: string,
        senderGithubUrl?: string,
        senderDateOfBirth?: string,
        senderCreatedAt?: string,
        senderLastModifiedAt?: string,
        senderLastLogginAt?: string,
        senderIsBanned?: boolean,
        senderBannedUntilDate?: string,
        senderAdresses?: Array<Address>,
        senderSlots?: Array<Slot>,
        senderBookings?: Array<Booking>,
        senderFormations?: Array<Formation>,
        senderNotificationsRecieved?: Array<Notification>,
        senderNotificationsCreated?: Array<Notification>,
        senderOrders?: Array<Order>,
        senderId?: string,
        senderUserName?: string,
        senderNormalizedUserName?: string,
        senderEmail?: string,
        senderNormalizedEmail?: string,
        senderEmailConfirmed?: boolean,
        senderPasswordHash?: string,
        senderSecurityStamp?: string,
        senderConcurrencyStamp?: string,
        senderPhoneNumber?: string,
        senderPhoneNumberConfirmed?: boolean,
        senderTwoFactorEnabled?: boolean,
        senderLockoutEnd?: string,
        senderLockoutEnabled?: boolean,
        senderAccessFailedCount?: number,
        recieverFirstName?: string,
        recieverLastName?: string,
        recieverGender?: EnumGender,
        recieverImgUrl?: string,
        recieverDescription?: string,
        recieverTitle?: string,
        recieverLinkedinUrl?: string,
        recieverGithubUrl?: string,
        recieverDateOfBirth?: string,
        recieverCreatedAt?: string,
        recieverLastModifiedAt?: string,
        recieverLastLogginAt?: string,
        recieverIsBanned?: boolean,
        recieverBannedUntilDate?: string,
        recieverAdresses?: Array<Address>,
        recieverSlots?: Array<Slot>,
        recieverBookings?: Array<Booking>,
        recieverFormations?: Array<Formation>,
        recieverNotificationsRecieved?: Array<Notification>,
        recieverNotificationsCreated?: Array<Notification>,
        recieverOrders?: Array<Order>,
        recieverId?: string,
        recieverUserName?: string,
        recieverNormalizedUserName?: string,
        recieverEmail?: string,
        recieverNormalizedEmail?: string,
        recieverEmailConfirmed?: boolean,
        recieverPasswordHash?: string,
        recieverSecurityStamp?: string,
        recieverConcurrencyStamp?: string,
        recieverPhoneNumber?: string,
        recieverPhoneNumberConfirmed?: boolean,
        recieverTwoFactorEnabled?: boolean,
        recieverLockoutEnd?: string,
        recieverLockoutEnabled?: boolean,
        recieverAccessFailedCount?: number,
    ): Observable<Mail> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/mail/send',
            query: {
                'MailTo': mailTo,
                'MailSubject': mailSubject,
                'MailBody': mailBody,
                'MailFrom': mailFrom,
                'SendtoSender': sendtoSender,
                'Sender.FirstName': senderFirstName,
                'Sender.LastName': senderLastName,
                'Sender.Gender': senderGender,
                'Sender.ImgUrl': senderImgUrl,
                'Sender.Description': senderDescription,
                'Sender.Title': senderTitle,
                'Sender.LinkedinUrl': senderLinkedinUrl,
                'Sender.GithubUrl': senderGithubUrl,
                'Sender.DateOfBirth': senderDateOfBirth,
                'Sender.CreatedAt': senderCreatedAt,
                'Sender.LastModifiedAt': senderLastModifiedAt,
                'Sender.LastLogginAt': senderLastLogginAt,
                'Sender.IsBanned': senderIsBanned,
                'Sender.BannedUntilDate': senderBannedUntilDate,
                'Sender.Adresses': senderAdresses,
                'Sender.Slots': senderSlots,
                'Sender.Bookings': senderBookings,
                'Sender.Formations': senderFormations,
                'Sender.NotificationsRecieved': senderNotificationsRecieved,
                'Sender.NotificationsCreated': senderNotificationsCreated,
                'Sender.Orders': senderOrders,
                'Sender.Id': senderId,
                'Sender.UserName': senderUserName,
                'Sender.NormalizedUserName': senderNormalizedUserName,
                'Sender.Email': senderEmail,
                'Sender.NormalizedEmail': senderNormalizedEmail,
                'Sender.EmailConfirmed': senderEmailConfirmed,
                'Sender.PasswordHash': senderPasswordHash,
                'Sender.SecurityStamp': senderSecurityStamp,
                'Sender.ConcurrencyStamp': senderConcurrencyStamp,
                'Sender.PhoneNumber': senderPhoneNumber,
                'Sender.PhoneNumberConfirmed': senderPhoneNumberConfirmed,
                'Sender.TwoFactorEnabled': senderTwoFactorEnabled,
                'Sender.LockoutEnd': senderLockoutEnd,
                'Sender.LockoutEnabled': senderLockoutEnabled,
                'Sender.AccessFailedCount': senderAccessFailedCount,
                'Reciever.FirstName': recieverFirstName,
                'Reciever.LastName': recieverLastName,
                'Reciever.Gender': recieverGender,
                'Reciever.ImgUrl': recieverImgUrl,
                'Reciever.Description': recieverDescription,
                'Reciever.Title': recieverTitle,
                'Reciever.LinkedinUrl': recieverLinkedinUrl,
                'Reciever.GithubUrl': recieverGithubUrl,
                'Reciever.DateOfBirth': recieverDateOfBirth,
                'Reciever.CreatedAt': recieverCreatedAt,
                'Reciever.LastModifiedAt': recieverLastModifiedAt,
                'Reciever.LastLogginAt': recieverLastLogginAt,
                'Reciever.IsBanned': recieverIsBanned,
                'Reciever.BannedUntilDate': recieverBannedUntilDate,
                'Reciever.Adresses': recieverAdresses,
                'Reciever.Slots': recieverSlots,
                'Reciever.Bookings': recieverBookings,
                'Reciever.Formations': recieverFormations,
                'Reciever.NotificationsRecieved': recieverNotificationsRecieved,
                'Reciever.NotificationsCreated': recieverNotificationsCreated,
                'Reciever.Orders': recieverOrders,
                'Reciever.Id': recieverId,
                'Reciever.UserName': recieverUserName,
                'Reciever.NormalizedUserName': recieverNormalizedUserName,
                'Reciever.Email': recieverEmail,
                'Reciever.NormalizedEmail': recieverNormalizedEmail,
                'Reciever.EmailConfirmed': recieverEmailConfirmed,
                'Reciever.PasswordHash': recieverPasswordHash,
                'Reciever.SecurityStamp': recieverSecurityStamp,
                'Reciever.ConcurrencyStamp': recieverConcurrencyStamp,
                'Reciever.PhoneNumber': recieverPhoneNumber,
                'Reciever.PhoneNumberConfirmed': recieverPhoneNumberConfirmed,
                'Reciever.TwoFactorEnabled': recieverTwoFactorEnabled,
                'Reciever.LockoutEnd': recieverLockoutEnd,
                'Reciever.LockoutEnabled': recieverLockoutEnabled,
                'Reciever.AccessFailedCount': recieverAccessFailedCount,
            },
        });
    }
    /**
     * @param requestBody
     * @returns Mail OK
     * @throws ApiError
     */
    public postMailContactAdmin(
        requestBody?: Mail,
    ): Observable<Mail> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/mail/contact-admin',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
