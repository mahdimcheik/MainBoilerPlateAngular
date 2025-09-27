/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { Int32ResponseDTO } from '../models/Int32ResponseDTO';
import type { Notification } from '../models/Notification';
import type { NotificationFilter } from '../models/NotificationFilter';
import type { NotificationResponseDTOPaginatedNotificationResultResponseDTO } from '../models/NotificationResponseDTOPaginatedNotificationResultResponseDTO';
import type { NotificationResponseDTOResponseDTO } from '../models/NotificationResponseDTOResponseDTO';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
@Injectable({
    providedIn: 'root',
})
export class NotificationsService {
    constructor(public readonly http: HttpClient) {}
    /**
     * @param requestBody
     * @returns NotificationResponseDTOResponseDTO OK
     * @throws ApiError
     */
    public postNotifications(
        requestBody?: Notification,
    ): Observable<NotificationResponseDTOResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/notifications',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns NotificationResponseDTOPaginatedNotificationResultResponseDTO OK
     * @throws ApiError
     */
    public postNotificationsUser(
        requestBody?: NotificationFilter,
    ): Observable<NotificationResponseDTOPaginatedNotificationResultResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/notifications/user',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns Int32ResponseDTO OK
     * @throws ApiError
     */
    public getNotificationsCount(): Observable<Int32ResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/notifications/count',
        });
    }
    /**
     * @param notificationId
     * @param newValue
     * @returns NotificationResponseDTOResponseDTO OK
     * @throws ApiError
     */
    public putNotifications(
        notificationId: string,
        newValue: boolean,
    ): Observable<NotificationResponseDTOResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'PUT',
            url: '/notifications/{notificationId}/{newValue}',
            path: {
                'notificationId': notificationId,
                'newValue': newValue,
            },
        });
    }
}
