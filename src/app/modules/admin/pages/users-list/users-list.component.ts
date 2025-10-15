import { Component, effect, signal, Type } from '@angular/core';
import { SmartGridComponent } from '../../../../generic-components/smart-grid/smart-grid.component';
import { StatusAccountDTO, UserResponseDTO } from '../../../../../api';
import { CustomTableState, DynamicColDef, ICellRendererAngularComp, INITIAL_STATE } from '../../../../shared/models/TableColumn ';
import { ActionButtonRendererComponent } from '../../../../generic-components/smart-grid/default-component';
import { ODataQueryBuilder, parseODataResponse } from '../../../../generic-components/smart-grid/odata-query-builder';

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
    // Table state
    filterParams = signal<CustomTableState>(INITIAL_STATE);
    loading = signal(false);
    totalRecords = signal(0);

    // Custom components
    customComponents = signal<{ [key: string]: Type<ICellRendererAngularComp> }>({
        default: ActionButtonRendererComponent
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
            field: 'email',
            header: 'Email',
            cellRenderer: 'default',
            type: 'text',
            sortable: true,
            sortField: 'email',
            filterable: true
        },
        {
            // Example of nested object filtering
            // Display uses JavaScript path: status.name
            // Filtering/Sorting uses OData path: status/name
            field: 'status', // JavaScript path for display
            header: 'Status',
            type: 'array',
            valueFormatter: (status) => (status as StatusAccountDTO)?.name,
            options: this.statuses,
            optionLabel: 'name',
            optionValue: 'id',
            filterable: true,
            filterField: 'status/name', // OData path for filtering
            sortable: true,
            sortField: 'status/name' // OData path for sorting
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
        // React to table state changes and load data from backend
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
            this.loading.set(true);

            // Build OData query from table state
            const odataQuery = ODataQueryBuilder.buildQuery(state);
            const queryString = ODataQueryBuilder.toQueryString(odataQuery);

            console.log('OData Query:', queryString);
            console.log('OData Params:', odataQuery);

            // TODO: Replace with actual API call
            // const response = await this.usersService.getUsers(queryString);
            // const { data, totalCount } = parseODataResponse(response);
            // this.users.set(data);
            // this.totalRecords.set(totalCount);

            // Mock data for demonstration
            const mockData = this.getMockData();
            this.users.set(mockData);
            this.totalRecords.set(50); // Mock total count
        } catch (error) {
            console.error('Error loading users:', error);
        } finally {
            this.loading.set(false);
        }
    }

    /**
     * Mock data for demonstration
     * TODO: Remove this and use real API
     */
    private getMockData(): UserResponseDTO[] {
        return [
            {
                id: '1',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                status: { id: '1', name: 'Active', color: '#000' },
                dateOfBirth: new Date('1990-01-15'),
                roles: ['Admin']
            },
            {
                id: '2',
                firstName: 'Jane',
                lastName: 'Smith',
                email: 'jane@example.com',
                status: { id: '2', name: 'Inactive', color: '#000' },
                dateOfBirth: new Date('1985-05-20'),
                roles: ['User']
            },
            {
                id: '3',
                firstName: 'Bob',
                lastName: 'Johnson',
                email: 'bob@example.com',
                status: { id: '1', name: 'Active', color: '#000' },
                dateOfBirth: new Date('1992-08-10'),
                roles: ['User']
            }
        ];
    }
}
