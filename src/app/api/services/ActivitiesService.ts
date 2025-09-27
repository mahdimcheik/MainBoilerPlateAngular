/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { ActivitiesStudentResponseDTO } from '../models/ActivitiesStudentResponseDTO';
import type { ActivitiesTeacherResponseDTO } from '../models/ActivitiesTeacherResponseDTO';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
@Injectable({
    providedIn: 'root',
})
export class ActivitiesService {
    constructor(public readonly http: HttpClient) {}
    /**
     * @returns ActivitiesTeacherResponseDTO OK
     * @throws ApiError
     */
    public getApiActivitiesTeacher(): Observable<ActivitiesTeacherResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/activities/teacher',
        });
    }
    /**
     * @param id
     * @returns ActivitiesStudentResponseDTO OK
     * @throws ApiError
     */
    public getApiActivitiesStudent(
        id: string,
    ): Observable<ActivitiesStudentResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/api/activities/student/{id}',
            path: {
                'id': id,
            },
        });
    }
}
