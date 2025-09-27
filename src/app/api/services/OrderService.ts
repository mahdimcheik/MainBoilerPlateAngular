/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { OrderPagination } from '../models/OrderPagination';
import type { OrderResponseForStudentDTOListResponseDTO } from '../models/OrderResponseForStudentDTOListResponseDTO';
import type { OrderResponseForStudentDTOResponseDTO } from '../models/OrderResponseForStudentDTOResponseDTO';
import type { OrderResponseForTeacherDTOListResponseDTO } from '../models/OrderResponseForTeacherDTOListResponseDTO';
import type { OrderResponseForTeacherDTOResponseDTO } from '../models/OrderResponseForTeacherDTOResponseDTO';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
@Injectable({
    providedIn: 'root',
})
export class OrderService {
    constructor(public readonly http: HttpClient) {}
    /**
     * @param requestBody
     * @returns OrderResponseForStudentDTOListResponseDTO OK
     * @throws ApiError
     */
    public postOrderStudentAll(
        requestBody?: OrderPagination,
    ): Observable<OrderResponseForStudentDTOListResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/order/student/all',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns OrderResponseForTeacherDTOListResponseDTO OK
     * @throws ApiError
     */
    public postOrderTeacherAll(
        requestBody?: OrderPagination,
    ): Observable<OrderResponseForTeacherDTOListResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/order/teacher/all',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param orderId
     * @returns OrderResponseForStudentDTOResponseDTO OK
     * @throws ApiError
     */
    public getOrderStudent(
        orderId: string,
    ): Observable<OrderResponseForStudentDTOResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/order/student/{orderId}',
            path: {
                'orderId': orderId,
            },
        });
    }
    /**
     * @param orderId
     * @returns OrderResponseForTeacherDTOResponseDTO OK
     * @throws ApiError
     */
    public getOrderTeacher(
        orderId: string,
    ): Observable<OrderResponseForTeacherDTOResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/order/teacher/{orderId}',
            path: {
                'orderId': orderId,
            },
        });
    }
    /**
     * @returns OrderResponseForStudentDTOResponseDTO OK
     * @throws ApiError
     */
    public getOrderStudentCurrent(): Observable<OrderResponseForStudentDTOResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/order/student/current',
        });
    }
}
