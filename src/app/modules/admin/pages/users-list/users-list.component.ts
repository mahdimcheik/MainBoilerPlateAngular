import { Component, signal } from '@angular/core';
import { SmartGridComponent } from '../../../../generic-components/smart-grid/smart-grid.component';
import type { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';

@Component({
    selector: 'app-users-list',
    imports: [SmartGridComponent],
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
    filterParams = signal<any>({});

    colDefs = signal<ColDef[]>([
        { field: 'make', filter: true },
        { field: 'model', filter: true },
        { field: 'price', filter: 'agNumberColumnFilter' },
        { field: 'electric', filter: 'agSetColumnFilter' }
    ]);

    data = signal<any[]>([
        { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
        { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
        { make: 'Toyota', model: 'Corolla', price: 29600, electric: false }
    ]);
}
