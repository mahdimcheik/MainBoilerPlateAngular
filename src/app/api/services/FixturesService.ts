/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
@Injectable({
    providedIn: 'root',
})
export class FixturesService {
    constructor(public readonly http: HttpClient) {}
    /**
     * @returns any OK
     * @throws ApiError
     */
    public getFixturesAddFormations(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/fixtures/add-formations',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public getFixturesAddAddresses(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/fixtures/add-addresses',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public getFixturesAddSlots(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/fixtures/add-slots',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public getFixturesAddOrders(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/fixtures/add-orders',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public getFixturesAddBookings(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/fixtures/add-bookings',
        });
    }
}
