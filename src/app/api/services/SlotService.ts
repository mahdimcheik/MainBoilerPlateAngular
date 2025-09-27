/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { ObjectResponseDTO } from '../models/ObjectResponseDTO';
import type { SlotCreateDTO } from '../models/SlotCreateDTO';
import type { SlotResponseDTOListResponseDTO } from '../models/SlotResponseDTOListResponseDTO';
import type { SlotResponseDTOResponseDTO } from '../models/SlotResponseDTOResponseDTO';
import type { SlotUpdateDTO } from '../models/SlotUpdateDTO';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
@Injectable({
    providedIn: 'root',
})
export class SlotService {
    constructor(public readonly http: HttpClient) {}
    /**
     * @param slotId
     * @returns SlotResponseDTOListResponseDTO OK
     * @throws ApiError
     */
    public getSlotSlotid(
        slotId: string,
    ): Observable<SlotResponseDTOListResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/slot/slotid/{slotId}',
            path: {
                'slotId': slotId,
            },
        });
    }
    /**
     * @param userId
     * @param fromDate
     * @param toDate
     * @returns SlotResponseDTOListResponseDTO OK
     * @throws ApiError
     */
    public getSlot(
        userId?: string,
        fromDate?: string,
        toDate?: string,
    ): Observable<SlotResponseDTOListResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/slot',
            query: {
                'userId': userId,
                'fromDate': fromDate,
                'toDate': toDate,
            },
        });
    }
    /**
     * @param requestBody
     * @returns SlotResponseDTOResponseDTO OK
     * @throws ApiError
     */
    public postSlot(
        requestBody?: SlotCreateDTO,
    ): Observable<SlotResponseDTOResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/slot',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns SlotResponseDTOResponseDTO OK
     * @throws ApiError
     */
    public putSlot(
        requestBody?: SlotUpdateDTO,
    ): Observable<SlotResponseDTOResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'PUT',
            url: '/slot',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param slotId
     * @returns ObjectResponseDTO OK
     * @throws ApiError
     */
    public deleteSlot(
        slotId?: string,
    ): Observable<ObjectResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'DELETE',
            url: '/slot',
            query: {
                'slotId': slotId,
            },
        });
    }
    /**
     * @param fromDate
     * @param toDate
     * @returns SlotResponseDTOListResponseDTO OK
     * @throws ApiError
     */
    public getSlotStudent(
        fromDate?: string,
        toDate?: string,
    ): Observable<SlotResponseDTOListResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/slot/student',
            query: {
                'fromDate': fromDate,
                'toDate': toDate,
            },
        });
    }
}
