import { Component, model, viewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-smart-grid',
    imports: [AgGridAngular, JsonPipe],
    templateUrl: './smart-grid.component.html',
    styleUrl: './smart-grid.component.scss'
})
export class SmartGridComponent {
    agGrid = viewChild(AgGridAngular);

    filterParams = model.required<any>();
    data = model.required<any[]>();
    private gridApi!: GridApi;
    colDefsSignal = model.required<ColDef[]>();

    onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;
        this.updateFilterParams();
    }

    // Method to get current filter parameters
    updateFilterParams() {
        if (this.gridApi) {
            const filterModel = this.gridApi.getFilterModel();
            this.filterParams.set(filterModel);
        }
    }

    // Method to manually get filter params (can be called from outside)
    getFilterParams() {
        this.updateFilterParams();
        return this.filterParams();
    }

    // Optional: Listen to filter changes
    onFilterChanged() {
        this.updateFilterParams();
    }

    // Method to set filter programmatically
    setFilter(column: string, filterValue: any) {
        if (this.gridApi) {
            this.gridApi.setFilterModel({ [column]: filterValue });
            this.updateFilterParams();
        }
    }

    // Method to clear all filters
    clearFilters() {
        if (this.gridApi) {
            this.gridApi.setFilterModel(null);
            this.updateFilterParams();
        }
    }

    // Method to get filter for a specific column
    getColumnFilter(column: string) {
        const filters = this.filterParams();
        return filters[column] || null;
    }
}
