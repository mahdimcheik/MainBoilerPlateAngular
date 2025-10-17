import { Component, computed, effect, inject, model, signal } from '@angular/core';
import { CustomTableState, DynamicColDef, INITIAL_STATE, SmartGridComponent } from '../../../../generic-components/smart-grid';
import { SmartSectionComponent } from '../../../../generic-components/smart-section/smart-section.component';
import { SmartElementComponent } from '../../../../generic-components/smart-element/smart-element.component';
import { UserMainService } from '../../../../shared/services/userMain.service';
import { AdminMainService } from '../../../../shared/services/admin-main.service';
import { LanguageResponseDTO, RoleAppResponseDTO, StatusAccountDTO } from '../../../../../api/models';
import { ButtonModule } from 'primeng/button';
import { firstValueFrom } from 'rxjs';

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

    roles = signal<RoleAppResponseDTO[]>([]);
    statuses = signal<StatusAccountDTO[]>([]);
    languages = signal<LanguageResponseDTO[]>([]);

    tableStateRoles = signal<CustomTableState>(INITIAL_STATE);
    totalRecordsRoles = signal(0);
    loadingRoles = signal(false);

    colDefsRoles = computed<DynamicColDef[]>(() => {
        const roles = this.roles();
        return [
            { field: 'name', header: 'Nom', type: 'text' },
            { field: 'createdAt', header: 'Créé le', type: 'date', valueFormatter: (data: any) => new Date(data).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }) },
            { field: 'updatedAt', header: 'Mis à jour le', type: 'date', valueFormatter: (data: any) => (data ? new Date(data).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'Pas de date') }
        ];
    });

    /**
     *
     */
    constructor() {
        effect(async () => {
            this.loadingRoles.set(true);
            const roles = await firstValueFrom(this.userService.getRoles(this.tableStateRoles()));
            this.roles.set(roles.data ?? []);
            this.totalRecordsRoles.set(roles.count ?? 0);
            this.loadingRoles.set(false);
        });
    }
}
