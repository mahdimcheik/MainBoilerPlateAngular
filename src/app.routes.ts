import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { SettingsComponent } from './app/pages/settings/settings.component';
import { canNotLoginGuard, isConnectedGuard, isNotConnectedGuard } from './app/shared/guards/can-login.guard';
import { isAdminOnlyGuard, isStudentOnlyGuard } from './app/shared/guards/is-admin-only.guard';

// Auth components
import { AuthLayoutComponent } from './app/modules/auth/pages/auth-layout/auth-layout.component';
import { LoginComponent } from './app/modules/auth/pages/login/login.component';
import { ForgotPasswordComponent } from './app/modules/auth/pages/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './app/modules/auth/pages/change-password/change-password.component';
import { AccountConfirmationComponent } from './app/modules/auth/pages/account-confirmation/account-confirmation.component';
import { InscriptionComponent } from './app/modules/auth/pages/inscription/inscription.component';
import { AccountCreatedSuccessfullyComponent } from './app/modules/auth/pages/account-created-successfully/account-created-successfully.component';
import { PasswordResetSuccessfullyComponent } from './app/modules/auth/pages/password-reset-successfully/password-reset-successfully.component';

// Landing components
import { MainComponent } from './app/pages/landing/sub-pages/main/main.component';
import { MentionsLegalesComponent } from './app/pages/landing/sub-pages/mentions-legales/mentions-legales.component';
import { Grid, GridComponent } from '@syncfusion/ej2-angular-grids';
import { GridTestComponent } from './app/test/grid.component';

// Define path constants
const DASHBOARD_PATH = 'dashboard';
const SETTINGS_PATH = 'settings';
const STUDENTS_LIST_PATH = 'students-list';
const CONTACT_PATH = 'contact';
const RESERVATION_PATH = 'reservation';
const PROFILE_PATH = 'profile/me';
const SUCCESS_PATH = 'success';
const CANCEL_PATH = 'cancel';

export const appRoutes: Routes = [
    // Landing routes
    {
        path: '',
        component: Landing,
        children: [
            {
                path: '',
                component: MainComponent
            },
            {
                path: 'mentions-legales',
                component: MentionsLegalesComponent
            }
        ]
    },

    // Auth routes
    {
        path: 'auth',
        component: AuthLayoutComponent,
        canActivate: [isNotConnectedGuard],
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'forgot-password',
                component: ForgotPasswordComponent
            },
            {
                path: 'reset-password',
                component: ChangePasswordComponent
            },
            {
                path: 'email-confirmation-success',
                component: AccountConfirmationComponent
            },
            {
                path: 'inscription',
                component: InscriptionComponent
            },
            {
                path: 'account-created-successfully',
                component: AccountCreatedSuccessfullyComponent
            },
            {
                path: 'password-reset-successfully',
                component: PasswordResetSuccessfullyComponent
            }
        ]
    },

    // Dashboard routes (protected)
    {
        path: DASHBOARD_PATH,
        component: AppLayout,
        canActivate: [isConnectedGuard],
        children: [
            // Settings
            { path: SETTINGS_PATH, component: SettingsComponent },
            { path: PROFILE_PATH, component: GridTestComponent }
        ]
    },

    // Not found route
    {
        path: 'notfound',
        component: Notfound
    },

    // Catch all route
    { path: '**', redirectTo: '/notfound' }
];
