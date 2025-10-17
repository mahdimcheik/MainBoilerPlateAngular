import { Component, computed, effect, inject, model, signal, Type } from '@angular/core';
import { CustomTableState, DynamicColDef, ICellRendererAngularComp, INITIAL_STATE, SmartGridComponent } from '../../../../generic-components/smart-grid';
import { SmartSectionComponent } from '../../../../generic-components/smart-section/smart-section.component';
import { SmartElementComponent } from '../../../../generic-components/smart-element/smart-element.component';
import { UserMainService } from '../../../../shared/services/userMain.service';
import { AdminMainService } from '../../../../shared/services/admin-main.service';
import { LanguageResponseDTO, RoleAppResponseDTO, StatusAccountDTO } from '../../../../../api/models';
import { ButtonModule } from 'primeng/button';
import { firstValueFrom } from 'rxjs';
import { ColorGridComponent } from '../../../../generic-components/smart-grid/color-grid.component';

@Component({
    selector: 'app-adminitration',
    imports: [SmartGridComponent, SmartSectionComponent, SmartElementComponent, ButtonModule],
    templateUrl: './adminitration.component.html',
    styleUrl: './adminitration.component.scss'
})
export class AdminitrationComponent {
    userService = inject(UserMainService);
    adminService = inject(AdminMainService);

    editMode = model(true);
    editModeLanguages = model(false);

    roles = signal<RoleAppResponseDTO[]>([]);
    statusesAccount = signal<StatusAccountDTO[]>([]);
    languages = signal<LanguageResponseDTO[]>([]);

    tableStateRoles = signal<CustomTableState>(INITIAL_STATE);
    tableStateStatusesAccount = signal<CustomTableState>(INITIAL_STATE);
    tableStateLanguages = signal<CustomTableState>(INITIAL_STATE);
    totalRecordsRoles = signal(0);
    loadingRoles = signal(false);
    totalRecordsStatusesAccount = signal(0);
    loadingStatusesAccount = signal(false);
    totalRecordsLanguages = signal(0);
    loadingLanguages = signal(false);

    customComponents = signal<{ [key: string]: Type<ICellRendererAngularComp> }>({
        color: ColorGridComponent
    });

    colDefsLanguages = computed<DynamicColDef[]>(() => {
        const languages = this.languages();
        return [
            { field: 'name', header: 'Nom', type: 'text' },
            { field: 'color', header: 'Couleur', type: 'array', cellRenderer: 'color', cellRendererParams: { editMode: this.editModeLanguages() } },
            { field: 'createdAt', header: 'Créé le', type: 'date', valueFormatter: (data: any) => new Date(data).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }) },
            { field: 'updatedAt', header: 'Mis à jour le', type: 'date', valueFormatter: (data: any) => (data ? new Date(data).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'Pas de date') }
        ];
    });

    colDefsRoles = computed<DynamicColDef[]>(() => {
        const roles = this.roles();
        return [
            { field: 'name', header: 'Nom', type: 'text' },
            { field: 'createdAt', header: 'Créé le', type: 'date', valueFormatter: (data: any) => new Date(data).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }) },
            { field: 'updatedAt', header: 'Mis à jour le', type: 'date', valueFormatter: (data: any) => (data ? new Date(data).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'Pas de date') }
        ];
    });

    colDefsStatusesAccount = computed<DynamicColDef[]>(() => {
        const statusesAccount = this.statusesAccount();
        return [
            { field: 'name', header: 'Nom', type: 'text' },
            { field: 'createdAt', header: 'Créé le', type: 'date', valueFormatter: (data: any) => new Date(data).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }) },
            { field: 'updatedAt', header: 'Mis à jour le', type: 'date', valueFormatter: (data: any) => (data ? new Date(data).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'Pas de date') }
        ];
    });

    constructor() {
        effect(async () => {
            const tableStateRoles = this.tableStateRoles();
            // roles
            this.loadingRoles.set(true);
            const roles = await firstValueFrom(this.userService.getRoles(this.tableStateRoles()));
            const statusesAccount = await firstValueFrom(this.userService.getStatusAccount(this.tableStateStatusesAccount()));
            this.roles.set(roles.data ?? []);
            this.totalRecordsRoles.set(roles.count ?? 0);
            this.loadingRoles.set(false);
        });

        effect(async () => {
            const tableStateStatusesAccount = this.tableStateStatusesAccount();
            // statuses account
            this.loadingStatusesAccount.set(true);
            const statusesAccount = await firstValueFrom(this.userService.getStatusAccount(this.tableStateStatusesAccount()));
            this.statusesAccount.set(statusesAccount.data ?? []);
            this.totalRecordsStatusesAccount.set(statusesAccount.count ?? 0);
            this.loadingStatusesAccount.set(false);
        });
        effect(async () => {
            const tableStateLanguages = this.tableStateLanguages();
            // languages
            this.loadingLanguages.set(true);
            const languages = await firstValueFrom(this.userService.getLanguages(this.tableStateLanguages()));
            this.languages.set(languages.data ?? []);
            this.totalRecordsLanguages.set(languages.count ?? 0);
            this.loadingLanguages.set(false);
        });
    }

    onEditClickLanguage() {
        this.editModeLanguages.set(!this.editModeLanguages());
    }
}
