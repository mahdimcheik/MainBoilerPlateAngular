/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { QueryPagination } from '../models/QueryPagination';
import type { UserBanDTO } from '../models/UserBanDTO';
import type { UserResponseDTOListResponseDTO } from '../models/UserResponseDTOListResponseDTO';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
@Injectable({
    providedIn: 'root',
})
export class AdminService {
    constructor(public readonly http: HttpClient) {}
    /**
     * @param requestBody
     * @returns UserResponseDTOListResponseDTO OK
     * @throws ApiError
     */
    public postAdminAllStudents(
        requestBody?: QueryPagination,
    ): Observable<UserResponseDTOListResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/admin/all-students',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public putAdminBanUnban(
        requestBody?: UserBanDTO,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'PUT',
            url: '/admin/ban-unban',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
