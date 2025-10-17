import { Component, effect, inject, signal, Type } from '@angular/core';
import { SmartGridComponent } from '../../../../generic-components/smart-grid/smart-grid.component';
import { StatusAccountDTO, UserResponseDTO } from '../../../../../api';
import { CustomTableState, DynamicColDef, ICellRendererAngularComp, INITIAL_STATE } from '../../../../shared/models/TableColumn ';
import { ActionButtonRendererComponent } from '../../../../generic-components/smart-grid/default-component';
import { OptionsRendererComponent } from '../../../../generic-components/smart-grid/options-component';

import { ODataQueryBuilder, parseODataResponse } from '../../../../generic-components/smart-grid/odata-query-builder';
import { UserMainService } from '../../../../shared/services/userMain.service';
import { AdminMainService } from '../../../../shared/services/admin-main.service';

/**
 * Example component showing how to use SmartGrid with OData backend
 */
@Component({
    selector: 'app-users-list',
    imports: [SmartGridComponent],
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
    adminService = inject(AdminMainService);
    // Table state
    filterParams = signal<CustomTableState>(INITIAL_STATE);
    loading = signal(false);
    totalRecords = signal(0);

    // Custom components
    customComponents = signal<{ [key: string]: Type<ICellRendererAngularComp> }>({
        default: ActionButtonRendererComponent,
        options: OptionsRendererComponent
    });

    // Data
    users = signal<UserResponseDTO[]>([]);

    // Options for filters
    statuses: StatusAccountDTO[] = [
        {
            id: '1',
            name: 'Active',
            color: '#000'
        },
        {
            id: '2',
            name: 'Inactive',
            color: '#000'
        },
        {
            id: '3',
            name: 'Pending',
            color: '#000'
        }
    ];

    // Column definitions
    columns = signal<DynamicColDef[]>([
        {
            field: 'firstName',
            header: 'First Name',
            type: 'text',
            sortable: true,
            sortField: 'firstName',
            filterable: true,
            width: '200px'
        },
        {
            field: 'firstName',
            header: 'First Name',
            type: 'text',
            sortable: true,
            sortField: 'firstName',
            filterable: true,
            width: '200px'
        },
        {
            field: 'email',
            header: 'Email',
            cellRenderer: 'default',
            type: 'text',
            sortable: true,
            sortField: 'email',
            filterable: true
        },
        {
            field: 'status', // JavaScript path for display
            header: 'Status',
            type: 'array',
            valueFormatter: (status) => (status as StatusAccountDTO)?.name,
            options: this.statuses,
            optionLabel: 'name',
            optionValue: 'id',
            filterable: true,
            filterField: 'statusId',
            cellRenderer: 'options',
            cellRendererParams: {
                options: this.statuses,
                optionLabel: 'name',
                optionValue: 'id'
            }
        },
        {
            field: 'dateOfBirth',
            header: 'Date of Birth',
            type: 'date',
            filterable: true,
            sortable: true
        }
    ]);

    constructor() {
        effect(
            () => {
                const state = this.filterParams();
                this.loadUsers(state);
            },
            { allowSignalWrites: true }
        );
    }

    /**
     * Load users from backend using OData
     */
    async loadUsers(state: CustomTableState) {
        try {
            // this.loading.set(true);
            const response = await this.adminService.getUsers(state);
            this.users.set(response.data ?? []);
            this.totalRecords.set(response.count ?? 0);
        } catch (error) {
            console.error('Error loading users:', error);
        } finally {
            // this.loading.set(false);
        }
    }
}
