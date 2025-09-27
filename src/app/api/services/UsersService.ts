/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { ForgotPasswordInput } from '../models/ForgotPasswordInput';
import type { LoginOutputDTO } from '../models/LoginOutputDTO';
import type { LoginOutputDTOResponseDTO } from '../models/LoginOutputDTOResponseDTO';
import type { ObjectResponseDTO } from '../models/ObjectResponseDTO';
import type { PasswordRecoveryInput } from '../models/PasswordRecoveryInput';
import type { PasswordResetResponseDTOResponseDTO } from '../models/PasswordResetResponseDTOResponseDTO';
import type { StringResponseDTO } from '../models/StringResponseDTO';
import type { UserCreateDTO } from '../models/UserCreateDTO';
import type { UserLoginDTO } from '../models/UserLoginDTO';
import type { UserResponseDTOResponseDTO } from '../models/UserResponseDTOResponseDTO';
import type { UserResponseDTOResponseDTOResponseDTO } from '../models/UserResponseDTOResponseDTOResponseDTO';
import type { UserResponseDTOResponsePaginationResponseDTO } from '../models/UserResponseDTOResponsePaginationResponseDTO';
import type { UserUpdateDTO } from '../models/UserUpdateDTO';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
@Injectable({
    providedIn: 'root',
})
export class UsersService {
    constructor(public readonly http: HttpClient) {}
    /**
     * @param requestBody
     * @returns UserResponseDTOResponseDTO OK
     * @throws ApiError
     */
    public postUsersRegister(
        requestBody?: UserCreateDTO,
    ): Observable<UserResponseDTOResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/users/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns UserResponseDTOResponseDTO OK
     * @throws ApiError
     */
    public patchUsersUpdate(
        requestBody?: UserUpdateDTO,
    ): Observable<UserResponseDTOResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'PATCH',
            url: '/users/update',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param formData
     * @returns UserResponseDTOResponseDTO OK
     * @throws ApiError
     */
    public postUsersUploadAvatar(
        formData?: {
            file?: Blob;
        },
    ): Observable<UserResponseDTOResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/users/upload-avatar',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * @param requestBody
     * @returns LoginOutputDTOResponseDTO OK
     * @throws ApiError
     */
    public postUsersLogin(
        requestBody?: UserLoginDTO,
    ): Observable<LoginOutputDTOResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/users/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param userId
     * @param confirmationToken
     * @returns StringResponseDTO OK
     * @throws ApiError
     */
    public getUsersEmailConfirmation(
        userId?: string,
        confirmationToken?: string,
    ): Observable<StringResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/users/email-confirmation',
            query: {
                'userId': userId,
                'confirmationToken': confirmationToken,
            },
        });
    }
    /**
     * @returns UserResponseDTOResponseDTO OK
     * @throws ApiError
     */
    public getUsersResendConfirmationLink(): Observable<UserResponseDTOResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/users/resend-confirmation-link',
        });
    }
    /**
     * @returns ObjectResponseDTO OK
     * @throws ApiError
     */
    public getUsersMyInformations(): Observable<ObjectResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/users/my-informations',
        });
    }
    /**
     * @param userId
     * @returns UserResponseDTOResponseDTOResponseDTO OK
     * @throws ApiError
     */
    public getUsersPublicInformations(
        userId?: string,
    ): Observable<UserResponseDTOResponseDTOResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/users/public-informations',
            query: {
                'userId': userId,
            },
        });
    }
    /**
     * @param requestBody
     * @returns PasswordResetResponseDTOResponseDTO OK
     * @throws ApiError
     */
    public postUsersForgotPassword(
        requestBody?: ForgotPasswordInput,
    ): Observable<PasswordResetResponseDTOResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/users/forgot-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns StringResponseDTO OK
     * @throws ApiError
     */
    public postUsersResetPassword(
        requestBody?: PasswordRecoveryInput,
    ): Observable<StringResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/users/reset-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns LoginOutputDTO OK
     * @throws ApiError
     */
    public getUsersRefreshToken(): Observable<LoginOutputDTO> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/users/refresh-token',
        });
    }
    /**
     * @param first
     * @param rows
     * @returns UserResponseDTOResponsePaginationResponseDTO OK
     * @throws ApiError
     */
    public getUsersAll(
        first?: number,
        rows?: number,
    ): Observable<UserResponseDTOResponsePaginationResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/users/all',
            query: {
                'first': first,
                'rows': rows,
            },
        });
    }
    /**
     * @returns ObjectResponseDTO OK
     * @throws ApiError
     */
    public getUsersLogout(): Observable<ObjectResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/users/logout',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public getUsersSeed(): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/users/seed',
        });
    }
}
