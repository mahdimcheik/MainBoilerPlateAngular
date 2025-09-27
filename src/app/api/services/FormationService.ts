/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { FormationCreateDTO } from '../models/FormationCreateDTO';
import type { FormationResponseDTOListResponseDTO } from '../models/FormationResponseDTOListResponseDTO';
import type { FormationResponseDTOResponseDTO } from '../models/FormationResponseDTOResponseDTO';
import type { FormationUpdateDTO } from '../models/FormationUpdateDTO';
import type { ObjectResponseDTO } from '../models/ObjectResponseDTO';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
@Injectable({
    providedIn: 'root',
})
export class FormationService {
    constructor(public readonly http: HttpClient) {}
    /**
     * @param userId
     * @returns FormationResponseDTOListResponseDTO OK
     * @throws ApiError
     */
    public getFormationAll(
        userId?: string,
    ): Observable<FormationResponseDTOListResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/formation/all',
            query: {
                'userId': userId,
            },
        });
    }
    /**
     * @param requestBody
     * @returns FormationResponseDTOResponseDTO OK
     * @throws ApiError
     */
    public postFormation(
        requestBody?: FormationCreateDTO,
    ): Observable<FormationResponseDTOResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/formation',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns FormationResponseDTOResponseDTO OK
     * @throws ApiError
     */
    public putFormation(
        requestBody?: FormationUpdateDTO,
    ): Observable<FormationResponseDTOResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'PUT',
            url: '/formation',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param formationId
     * @returns ObjectResponseDTO OK
     * @throws ApiError
     */
    public deleteFormation(
        formationId?: string,
    ): Observable<ObjectResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'DELETE',
            url: '/formation',
            query: {
                'formationId': formationId,
            },
        });
    }
}
