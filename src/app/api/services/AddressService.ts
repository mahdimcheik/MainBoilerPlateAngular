/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { AddressCreateDTO } from '../models/AddressCreateDTO';
import type { AddressResponseDTOListResponseDTO } from '../models/AddressResponseDTOListResponseDTO';
import type { AddressResponseDTOResponseDTO } from '../models/AddressResponseDTOResponseDTO';
import type { AddressUpdateDTO } from '../models/AddressUpdateDTO';
import type { StringResponseDTO } from '../models/StringResponseDTO';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
@Injectable({
    providedIn: 'root',
})
export class AddressService {
    constructor(public readonly http: HttpClient) {}
    /**
     * @param userId
     * @returns AddressResponseDTOListResponseDTO OK
     * @throws ApiError
     */
    public getAddressAll(
        userId?: string,
    ): Observable<AddressResponseDTOListResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/address/all',
            query: {
                'userId': userId,
            },
        });
    }
    /**
     * @param requestBody
     * @returns AddressResponseDTOResponseDTO OK
     * @throws ApiError
     */
    public postAddress(
        requestBody?: AddressCreateDTO,
    ): Observable<AddressResponseDTOResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/address',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns AddressResponseDTOResponseDTO OK
     * @throws ApiError
     */
    public putAddress(
        requestBody?: AddressUpdateDTO,
    ): Observable<AddressResponseDTOResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'PUT',
            url: '/address',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param addressId
     * @returns StringResponseDTO OK
     * @throws ApiError
     */
    public deleteAddress(
        addressId?: string,
    ): Observable<StringResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'DELETE',
            url: '/address',
            query: {
                'addressId': addressId,
            },
        });
    }
}
