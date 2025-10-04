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
import type { UserUpdateDTO } from '../models/UserUpdateDTO';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(public readonly http: HttpClient) {}
    /**
     * Enregistre un nouvel utilisateur.
     * @param requestBody Données de création de l'utilisateur.
     * @returns UserResponseDTOResponseDTO OK
     * @throws ApiError
     */
    public postAuthRegister(
        requestBody?: UserCreateDTO,
    ): Observable<UserResponseDTOResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/auth/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param userId
     * @returns UserResponseDTOResponseDTO OK
     * @throws ApiError
     */
    public getAuthConfirmStatus(
        userId?: string,
    ): Observable<UserResponseDTOResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/auth/confirm-status',
            query: {
                'userId': userId,
            },
        });
    }
    /**
     * Met à jour les informations d'un utilisateur.
     * @param requestBody Données de mise à jour de l'utilisateur.
     * @returns UserResponseDTOResponseDTO OK
     * @throws ApiError
     */
    public patchAuthUpdate(
        requestBody?: UserUpdateDTO,
    ): Observable<UserResponseDTOResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'PATCH',
            url: '/auth/update',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Connecte un utilisateur.
     * @param requestBody Données de connexion de l'utilisateur.
     * @returns LoginOutputDTOResponseDTO OK
     * @throws ApiError
     */
    public postAuthLogin(
        requestBody?: UserLoginDTO,
    ): Observable<LoginOutputDTOResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Valide une adresse e-mail.
     * @param userId Identifiant de l'utilisateur.
     * @param confirmationToken Token de confirmation.
     * @returns StringResponseDTO OK
     * @throws ApiError
     */
    public getAuthEmailConfirmation(
        userId?: string,
        confirmationToken?: string,
    ): Observable<StringResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/auth/email-confirmation',
            query: {
                'userId': userId,
                'confirmationToken': confirmationToken,
            },
        });
    }
    /**
     * Récupère les informations de l'utilisateur connecté.
     * @returns ObjectResponseDTO OK
     * @throws ApiError
     */
    public getAuthMyInformations(): Observable<ObjectResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/auth/my-informations',
        });
    }
    /**
     * Demande un e-mail de récupération de mot de passe.
     * @param requestBody Données pour la récupération du mot de passe.
     * @returns PasswordResetResponseDTOResponseDTO OK
     * @throws ApiError
     */
    public postAuthForgotPassword(
        requestBody?: ForgotPasswordInput,
    ): Observable<PasswordResetResponseDTOResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/auth/forgot-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Change le mot de passe après une récupération.
     * @param requestBody Données pour changer le mot de passe.
     * @returns StringResponseDTO OK
     * @throws ApiError
     */
    public postAuthResetPassword(
        requestBody?: PasswordRecoveryInput,
    ): Observable<StringResponseDTO> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/auth/reset-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Met à jour le token de rafraîchissement.
     * @returns LoginOutputDTO OK
     * @throws ApiError
     */
    public getAuthRefreshToken(): Observable<LoginOutputDTO> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/auth/refresh-token',
        });
    }
}
