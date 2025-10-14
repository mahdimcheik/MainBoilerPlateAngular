import { Component, signal, Type } from '@angular/core';
import { SmartGridComponent } from '../../../../generic-components/smart-grid/smart-grid.component';
import { StatusAccountDTO, UserResponseDTO } from '../../../../../api';
import { DynamicColDef, ICellRendererAngularComp } from '../../../../shared/models/TableColumn ';
import { ActionButtonRendererComponent } from '../../../../generic-components/smart-grid/default-component';

@Component({
    selector: 'app-users-list',
    imports: [SmartGridComponent],
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
    filterParams = signal<any>({});
    customComponents = signal<{ [key: string]: Type<ICellRendererAngularComp> }>({
        default: ActionButtonRendererComponent
    });

    users = signal<UserResponseDTO[]>([
        {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            status: { id: '1', name: 'Active', color: '#000' },
            dateOfBirth: new Date(),
            roles: ['Admin']
        },
        {
            id: '2',
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane@example.com',
            status: { id: '2', name: 'Inactive', color: '#000' },
            dateOfBirth: new Date(),
            roles: ['User']
        }
    ]);
    columns = signal<DynamicColDef[]>([
        { field: 'firstName', header: 'Name', type: 'text' },
        { field: 'email', header: 'Email', cellRenderer: 'default', type: 'text' },
        // { field: 'roles', header: 'Role' },
        { field: 'status', header: 'Status', type: 'custom', valueFormatter: (status) => (status as StatusAccountDTO).name },
        { field: 'dateOfBirth', header: 'Created At', type: 'date' }
    ]);
}
