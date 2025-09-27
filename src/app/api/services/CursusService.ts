/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { CategoryIEnumerableResponseDTO } from '../models/CategoryIEnumerableResponseDTO';
import type { CreateCursusDto } from '../models/CreateCursusDto';
import type { CursusDtoIEnumerableResponseDTO } from '../models/CursusDtoIEnumerableResponseDTO';
import type { CursusDtoResponseDTO } from '../models/CursusDtoResponseDTO';
import type { LevelIEnumerableResponseDTO } from '../models/LevelIEnumerableResponseDTO';
import type { QueryPagination } from '../models/QueryPagination';
import type { StringResponseDTO } from '../models/StringResponseDTO';
import type { UpdateCursusDto } from '../models/UpdateCursusDto';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
@Injectable({
    providedIn: 'root',
})
export class CursusService {
    constructor(public readonly http: HttpClient) {}
    /**
     * @param requestBody
     * @returns CursusDtoIEnumerableResponseDTO OK
     * @throws ApiError
     */
    public postCursusAll(
        requestBody?: QueryPagination,
    ): Observable<CursusDtoIEnumerableResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/cursus/all',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @param requestBody
     * @returns CursusDtoResponseDTO Created
     * @throws ApiError
     */
    public postCursus(
        requestBody?: CreateCursusDto,
    ): Observable<CursusDtoResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/cursus',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns CursusDtoResponseDTO OK
     * @throws ApiError
     */
    public putCursus(
        id: string,
        requestBody?: UpdateCursusDto,
    ): Observable<CursusDtoResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'PUT',
            url: '/cursus/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @param id
     * @returns StringResponseDTO OK
     * @throws ApiError
     */
    public deleteCursus(
        id: string,
    ): Observable<StringResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'DELETE',
            url: '/cursus/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns LevelIEnumerableResponseDTO OK
     * @throws ApiError
     */
    public getCursusLevels(): Observable<LevelIEnumerableResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/cursus/levels',
            errors: {
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns CategoryIEnumerableResponseDTO OK
     * @throws ApiError
     */
    public getCursusCategories(): Observable<CategoryIEnumerableResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/cursus/categories',
            errors: {
                500: `Internal Server Error`,
            },
        });
    }
}
