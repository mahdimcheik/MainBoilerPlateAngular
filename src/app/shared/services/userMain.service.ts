import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LocalstorageService } from './localstorage.service';
// import { SSEMainService } from './sseMain.service';

// Generated services and models
import { CookieConsentService } from './cookie-consent.service';
import { EnumGender, GenderDropDown } from '../../shared/models/user';
import {
    AuthService,
    ForgotPasswordInput,
    LoginOutputDTO,
    LoginOutputDTOResponseDTO,
    PasswordRecoveryInput,
    PasswordResetResponseDTO,
    PasswordResetResponseDTOResponseDTO,
    StringResponseDTO,
    UserCreateDTO,
    UserInfosWithtoken,
    UserInfosWithtokenResponseDTO,
    UserLoginDTO,
    UserResponseDTO,
    UserResponseDTOResponseDTO,
    UserUpdateDTO
} from '../../../api';
import { ResponseDTO } from '../models/response-dto';

/**
 * service pour gérer les utilisateurs.
 * en fonction de leurs roles, les liens de la sidebar changent.
 * Fournit des méthodes pour l'authentification, l'inscription, la gestion des profils, etc. via l'API.
 * Utilise UsersService généré par OpenAPI pour les appels API.
 */
@Injectable({
    providedIn: 'root'
})
export class UserMainService {
    baseUrl = environment.API_URL;
    private authService = inject(AuthService);
    private localStorageService = inject(LocalstorageService);

    router = inject(Router);
    messageService = inject(MessageService);
    cookieConsentService = inject(CookieConsentService);
    // pour la page profile
    userConnected = signal({} as UserResponseDTO);
    userToDisplay = signal({} as UserResponseDTO);

    isAdmin = computed(() => this.userConnected()?.roles?.includes('Admin'));

    // lien de side navbar
    sideNavItems = signal<MenuItem[]>([]);

    // pour la page qui je suis ?
    teacherDetails = signal({} as UserResponseDTO);

    refreshAccessToken = signal<string | null>(null);
    token = signal<string>('');

    typesGenderList: GenderDropDown[] = [
        {
            id: '1',
            name: 'Homme',
            value: EnumGender.Homme
        },
        {
            id: '2',
            name: 'Femme',
            value: EnumGender.Femme
        },
        {
            id: '3',
            name: 'Non-binaire',
            value: EnumGender.NonBinaire
        },
        {
            id: '4',
            name: 'Autre',
            value: EnumGender.Autre
        }
    ];

    constructor() {
        effect(() => {
            this.isAdmin()
                ? this.sideNavItems.set([
                      { label: 'Tableau de bord', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] },
                      { label: 'Réservations', icon: 'pi pi-fw pi-list', routerLink: ['/dashboard/reservation/list'] },
                      { label: 'Calendrier', icon: 'pi pi-fw pi-calendar', routerLink: ['/dashboard/reservation/calendar-for-teacher'] },
                      { label: 'Utilisateurs', icon: 'pi pi-users', routerLink: ['/dashboard/students-list'] },
                      { label: 'Profil', icon: 'pi pi-fw pi-calendar', routerLink: ['/dashboard/profile/me'] }
                  ])
                : this.sideNavItems.set([
                      { label: 'Tableau de bord', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] },
                      { label: 'Réservations', icon: 'pi pi-fw pi-list', routerLink: ['/dashboard/reservation/list'] },
                      { label: 'Calendrier', icon: 'pi pi-fw pi-calendar', routerLink: ['/dashboard/reservation/calendar-for-student'] },
                      { label: 'Mes Commandes', icon: 'pi pi-cart-arrow-down', routerLink: ['/dashboard/reservation/orders-student'] },
                      { label: 'Profil', icon: 'pi pi-fw pi-user', routerLink: ['/dashboard/profile/me'] },
                      { label: 'Contact', icon: 'pi pi-fw pi-at', routerLink: ['/dashboard/contact'] }
                  ]);
        });
    }
    /**
     * Enregistre un nouvel utilisateur.
     * @param userDTO les données de l'utilisateur à enregistrer
     * @returns Un observable contenant la réponse de l'API
     */
    register(userDTO: UserCreateDTO): Observable<ResponseDTO<UserResponseDTO>> {
        return this.authService.authRegisterPost(userDTO).pipe(
            map((response) => {
                return {
                    message: response.message ?? '',
                    status: response.status!,
                    data: response.data as UserResponseDTO
                };
            }),
            catchError((error) => {
                console.error("Erreur lors de l'inscription :", error);
                return of({
                    message: error.message ?? 'Erreur inconnue',
                    status: error.status ?? 500,
                    data: {} as UserResponseDTO
                } as ResponseDTO<UserResponseDTO>);
            })
        );
    }

    /**
     * Authentifie un utilisateur.
     * @param userLoginDTO les données de connexion de l'utilisateur
     * @returns Un observable contenant la réponse de l'API
     */
    login(userLoginDTO: UserLoginDTO): Observable<ResponseDTO<LoginOutputDTO>> {
        return this.authService.authLoginPost(userLoginDTO).pipe(
            map((response) => {
                return {
                    message: response.message ?? '',
                    status: response.status!,
                    data: response.data as LoginOutputDTO
                };
            }),
            tap((res) => {
                if (res.data) {
                    this.cookieConsentService.acceptAll();
                    this.userConnected.set(res.data.user as UserResponseDTO);
                    this.token.set(res.data.token ?? '');
                }
            })
        );
    }
    /**
     * Rafraîchit le token d'authentification.
     * @returns Un observable contenant la réponse de l'API
     */
    refreshToken(): Observable<LoginOutputDTO> {
        return this.authService.authRefreshTokenGet().pipe(
            switchMap((response: LoginOutputDTOResponseDTO) => {
                const legacyResponse: LoginOutputDTO = {
                    refreshToken: response.data?.refreshToken ?? '',
                    user: response.data?.user as UserResponseDTO,
                    token: response.data?.token ?? ''
                };
                return of(legacyResponse);
            }),
            tap((res) => {
                this.token.set(res.token ?? '');
                this.userConnected.set(res.user as UserResponseDTO);
            })
        );
    }

    /**
     * Récupère les informations du profil de l'utilisateur. en utilisant le refresh-token
     * @returns Un observable contenant la réponse de l'API
     */
    getprofile(): Observable<ResponseDTO<UserInfosWithtoken>> {
        return this.authService.authMyInformationsGet().pipe(
            switchMap((response: UserInfosWithtokenResponseDTO) => {
                const legacyResponse: ResponseDTO<UserInfosWithtoken> = {
                    message: response.message || '',
                    status: response.status || 200,
                    data: response.data
                };
                return of(legacyResponse);
            }),
            tap((res) => {
                if ((res.data as any).user) {
                    this.userConnected.set((res.data as any).user);
                    this.token.set((res.data as any).token);
                }
            })
        );
    }

    /**
     * Récupère le profil public d'un utilisateur par son ID.
     * @param input les données pour réinitialiser le mot de passe (email)
     * @returns Un observable contenant la réponse de l'API
     */
    forgotPassword(input: { email: string }): Observable<ResponseDTO<PasswordResetResponseDTO>> {
        const forgotPasswordInput: ForgotPasswordInput = {
            email: input.email
        };
        return this.authService.authForgotPasswordPost(forgotPasswordInput).pipe(
            switchMap((response: PasswordResetResponseDTOResponseDTO) => {
                const legacyResponse: ResponseDTO<PasswordResetResponseDTO> = {
                    message: response.message || '',
                    status: response.status || 200,
                    data: response.data as PasswordResetResponseDTO
                };
                return of(legacyResponse);
            })
        );
    }

    /**
     * Récupère le profil public d'un utilisateur par son ID.
     * @param changePassword les données pour réinitialiser le mot de passe (token, newPassword)
     * @returns Un observable contenant la réponse de l'API
     */
    resetPassword(changePassword: PasswordRecoveryInput): Observable<ResponseDTO<string>> {
        return this.authService.authResetPasswordPost(changePassword).pipe(
            switchMap((response: StringResponseDTO) => {
                const legacyResponse: ResponseDTO<string> = {
                    message: response.message || '',
                    status: response.status || 200,
                    data: response.data as string
                };
                return of(legacyResponse);
            })
        );
    }

    /**
     * Réinitialise les données utilisateur stockées localement.
     * Utilisé lors de la déconnexion.
     * @returns void
     */
    reset(): void {
        this.localStorageService.reset();
        this.userConnected.set({} as UserResponseDTO);
        this.token.set('');
    }
    logout(): void {
        this.reset();
        this.router.navigate(['/auth/login']);
    }

    /**
     * Met à jour les informations personnelles de l'utilisateur.
     * @param userUpdated les données de l'utilisateur à mettre à jour
     * @returns Un observable contenant la réponse de l'API
     */
    updatePersonnalInfos(userUpdated: UserUpdateDTO): Observable<ResponseDTO<UserResponseDTO>> {
        return this.authService.authUpdatePatch(userUpdated).pipe(
            switchMap((response: any) => {
                const legacyResponse: ResponseDTO<UserResponseDTO> = {
                    message: response.message || '',
                    status: response.status || 200,
                    data: response.data as UserResponseDTO
                };
                return of(legacyResponse);
            }),
            tap((res) => {
                if (res.data) {
                    this.userConnected.set(res.data);
                    this.userToDisplay.set(res.data);
                    this.localStorageService.setUser(res.data);
                }
            })
        );
    }
}
