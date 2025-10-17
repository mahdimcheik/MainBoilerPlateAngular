import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { catchError, firstValueFrom, map, Observable, of, switchMap, tap } from 'rxjs';
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
    RoleAppResponseDTO,
    RoleAppResponseDTOListResponseDTO,
    RoleAppService,
    StatusAccountDTO,
    StatusAccountResponseDTO,
    StatusAccountResponseDTOListResponseDTO,
    StatusAccountService,
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
import { BrowserModule } from '@angular/platform-browser';
import { CustomTableState } from '../models/TableColumn ';

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
    statusAccountService = inject(StatusAccountService);
    roleAppService = inject(RoleAppService);
    // pour la page profile
    userConnected = signal({} as UserResponseDTO);

    isAdmin = computed(() => this.userConnected()?.roles?.some((role) => role.name === 'Admin'));
    isSuperAdmin = computed(() => this.userConnected()?.roles?.some((role) => role.name === 'SuperAdmin'));
    isTeacher = computed(() => this.userConnected()?.roles?.some((role) => role.name === 'Teacher'));
    isStudent = computed(() => this.userConnected()?.roles?.some((role) => role.name === 'Student'));

    // lien de side navbar
    sideNavItems = signal<MenuItem[]>([]);
    landingNavItems = signal<MenuItem[]>([]);

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
            const user = this.userConnected();
            if (this.isAdmin()) {
                this.sideNavItems.set([
                    { label: 'Tableau de bord', icon: 'pi pi-fw pi-home', routerLink: ['/admin'] },
                    { label: 'Utilisateurs', icon: 'pi pi-users', routerLink: ['/admin/users-list'] },
                    { label: 'Réservations', icon: 'pi pi-fw pi-list', routerLink: ['/dashboard/reservation/list'] },
                    { label: 'Calendrier', icon: 'pi pi-fw pi-calendar', routerLink: ['/dashboard/reservation/calendar-for-teacher'] },
                    { label: 'Utilisateurs', icon: 'pi pi-users', routerLink: ['/dashboard/students-list'] },
                    { label: 'Profil', icon: 'pi pi-fw pi-calendar', routerLink: ['/dashboard/profile/me'] }
                ]);
                this.landingNavItems.set([
                    { label: 'Tableau de bord', icon: 'pi pi-fw pi-home', routerLink: ['/admin'] },
                    { label: 'Utilisateurs', icon: 'pi pi-users', routerLink: ['/admin/users-list'] }
                ]);
            } else if (this.isSuperAdmin()) {
                this.sideNavItems.set([
                    { label: 'Tableau de bord', icon: 'pi pi-fw pi-home', routerLink: ['/admin'] },
                    { label: 'Utilisateurs', icon: 'pi pi-users', routerLink: ['/admin/users-list'] },
                    { label: 'Paramètres', icon: 'pi pi-cog', routerLink: ['/admin/adminitration'] }
                ]);
            } else if (this.isTeacher()) {
                this.sideNavItems.set([
                    { label: 'Tableau de bord', icon: 'pi pi-fw pi-home', routerLink: ['/teacher'] },
                    { label: 'Réservations', icon: 'pi pi-fw pi-list', routerLink: ['/teacher/reservation/list'] },
                    { label: 'Calendrier', icon: 'pi pi-fw pi-calendar', routerLink: ['/teacher/reservation/calendar-for-student'] },
                    { label: 'Mes Commandes', icon: 'pi pi-cart-arrow-down', routerLink: ['/teacher/reservation/orders-student'] },
                    { label: 'Profil', icon: 'pi pi-fw pi-user', routerLink: ['/teacher/profile/me'] },
                    { label: 'Contact', icon: 'pi pi-fw pi-at', routerLink: ['/teacher/contact'] }
                ]);
            } else if (this.isStudent()) {
                this.sideNavItems.set([
                    { label: 'Tableau de bord', icon: 'pi pi-fw pi-home', routerLink: ['/student'] },
                    { label: 'Réservations', icon: 'pi pi-fw pi-list', routerLink: ['/dashboard/reservation/list'] },
                    { label: 'Calendrier', icon: 'pi pi-fw pi-calendar', routerLink: ['/dashboard/reservation/calendar-for-student'] },
                    { label: 'Mes Commandes', icon: 'pi pi-cart-arrow-down', routerLink: ['/dashboard/reservation/orders-student'] },
                    { label: 'Profil', icon: 'pi pi-fw pi-user', routerLink: ['/dashboard/profile/me'] },
                    { label: 'Contact', icon: 'pi pi-fw pi-at', routerLink: ['/dashboard/contact'] }
                ]);
            }
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

    async getPublicInformations(userId: string) {
        const response = await firstValueFrom(
            this.authService.authPublicInformationsGet(userId).pipe(
                switchMap((response: UserResponseDTOResponseDTO) => {
                    const legacyResponse: ResponseDTO<UserResponseDTO> = {
                        message: response.message || '',
                        status: response.status || 200,
                        data: response.data as UserResponseDTO
                    };
                    return of(legacyResponse);
                })
            )
        );
        return response;
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
    async logout(): Promise<void> {
        this.reset();
        await firstValueFrom(
            this.authService.authLogoutGet().pipe(
                tap(() => {
                    this.router.navigate(['/auth/login']);
                })
            )
        );
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
                    this.localStorageService.setUser(res.data);
                }
            })
        );
    }

    // status account
    getStatusAccount(): Observable<ResponseDTO<StatusAccountDTO[]>> {
        return this.statusAccountService.statusaccountAllGet().pipe(
            switchMap((response: StatusAccountResponseDTOListResponseDTO) => {
                const legacyResponse: ResponseDTO<StatusAccountDTO[]> = {
                    message: response.message || '',
                    status: response.status || 200,
                    data: response.data as StatusAccountDTO[]
                };
                return of(legacyResponse);
            })
        );
    }

    // users roles
    getRoles(CustomTableState: CustomTableState): Observable<ResponseDTO<RoleAppResponseDTO[]>> {
        return this.roleAppService.roleappAllPost(CustomTableState).pipe(
            switchMap((response: RoleAppResponseDTOListResponseDTO) => {
                const legacyResponse: ResponseDTO<RoleAppResponseDTO[]> = {
                    message: response.message || '',
                    status: response.status || 200,
                    data: response.data ?? []
                };
                return of(legacyResponse);
            })
        );
    }
}
