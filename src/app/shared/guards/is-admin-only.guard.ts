import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserMainService } from '../services/userMain.service';
import { firstValueFrom } from 'rxjs';
/***
 * Guard qui empêche l'accès à une route si l'utilisateur n'est pas un admin.
 * Utilisation : { path: 'admin', canActivate: [isAdminOnlyGuard], component: AdminComponent }
 */
export const isAdminOnlyGuard: CanActivateFn = async (route, state) => {
    var auth = inject(UserMainService);
    if (auth.userConnected().email) {
        if (auth.userConnected().roles?.includes('Admin')) {
            return true;
        } else {
            return false;
        }
    }
    return false;
    // try {
    //     await firstValueFrom(auth.refreshToken());
    //     if (auth.userConnected().email && auth.userConnected().roles?.includes('Admin')) {
    //         return true;
    //     }
    //     return false;
    // } catch {
    //     return false;
    // }
};

export const isStudentOnlyGuard: CanActivateFn = async (route, state) => {
    var auth = inject(UserMainService);
    if ((auth as any).userConnected().email) {
        if ((auth as any).userConnected().roles.includes('Student')) {
            return true;
        } else {
            return false;
        }
    }

    return false;
    // try {
    //     await firstValueFrom((auth as any).refreshToken());
    //     if ((auth as any).userConnected().email && (auth as any).userConnected().roles.includes('Student')) {
    //         return true;
    //     }
    //     return false;
    // } catch {
    //     return false;
    // }
};
