import { NgModule, viewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GridModule, FilterService, PageService, GridComponent, ColumnModel } from '@syncfusion/ej2-angular-grids';
import { MultiSelectModule, CheckBoxSelectionService, DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';

import { Component, OnInit } from '@angular/core';
import { FilterSettingsModel, PageSettingsModel } from '@syncfusion/ej2-angular-grids';

import { data } from './data';
import { AdvancedGridComponent } from './advanced-grid.component';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { SchedulererTestComponent } from './schedulerer';

@Component({
    imports: [GridModule, MultiSelectModule, DropDownListAllModule, CheckBoxModule, AdvancedGridComponent, ScheduleModule, SchedulererTestComponent],

    providers: [FilterService, PageService, CheckBoxSelectionService],
    standalone: true,
    selector: 'grid-test',
    template: `
        <app-scheduler></app-scheduler>

        <ejs-grid
            [dataSource]="data"
            [columns]="columns"
            allowPaging="true"
            [pageSettings]="pageSettings"
            [allowFiltering]="true"
            height="273px"
            [filterSettings]="filterSettings"
            (actionBegin)="onActionBegin($event)"
            (actionComplete)="onActionComplete($event)"
            #grid
        ></ejs-grid>

        <!-- Debug section to display filter params -->
        <div style="margin-top: 20px; padding: 10px; border: 1px solid #ccc; background: #f5f5f5;">
            <h3>Current Filter Parameters:</h3>
            <pre>{{ getFilterParamsDisplay() }}</pre>

            <div style="margin-top: 10px;">
                <button (click)="logCurrentFilters()" style="margin-right: 10px; padding: 5px 10px;">Log Current Filters to Console</button>
                <button (click)="addActionColumn()" style="margin-right: 10px; padding: 5px 10px;">Add Action Column</button>
                <button (click)="toggleColumn('Freight')" style="margin-right: 10px; padding: 5px 10px;">Toggle Freight Column</button>
                <button (click)="updateColumnWidth('CustomerID', 200)" style="margin-right: 10px; padding: 5px 10px;">Widen Customer ID</button>
                <button (click)="setStringFiltersToContainsOnly()" style="margin-right: 10px; padding: 5px 10px;">String: Contains Only</button>
                <button (click)="resetFilterOperators()" style="padding: 5px 10px;">Reset All Filters</button>
            </div>
        </div>
        <advanced-grid></advanced-grid>
    `
})
export class GridTestComponent implements OnInit {
    public data?: object[];
    public filterSettings?: FilterSettingsModel;
    public pageSettings?: PageSettingsModel = { pageSize: 10 };
    public grid = viewChild<GridComponent>('grid');
    public currentFilterParams: any = {};

    // Define columns in TypeScript (like ag-grid)
    public columns: ColumnModel[] = [
        {
            field: 'OrderID',
            headerText: 'Order ID',
            textAlign: 'Right',
            width: 100,
            type: 'number',
            isPrimaryKey: true,
            allowFiltering: true,
            allowSorting: true
        },
        {
            field: 'CustomerID',
            headerText: 'Customer ID',
            width: 120,
            type: 'string',
            allowFiltering: true,
            allowSorting: true,
            // Custom filter options - only show "contains" for this column
            filter: {
                type: 'Menu',
                operator: 'contains', // Default operator
                ui: {
                    create: (args: any) => {
                        // Custom filter UI if needed
                    }
                }
            }
        },
        {
            field: 'OrderDate',
            headerText: 'Order Date',
            width: 120,
            format: 'yMd',
            type: 'date',
            allowFiltering: true,
            allowSorting: true
        },
        {
            field: 'ShipCity',
            headerText: 'Ship City',
            width: 120,
            type: 'string',
            allowFiltering: true,
            allowSorting: true,
            // Only allow "contains" and "startswith" for city names
            filter: {
                type: 'Menu',
                operator: 'contains'
            }
        },
        {
            field: 'ShipName',
            headerText: 'Ship Name',
            width: 150,
            type: 'string',
            allowFiltering: true,
            allowSorting: true,
            clipMode: 'EllipsisWithTooltip',
            // Only allow "contains" for ship names
            filter: {
                type: 'Menu',
                operator: 'contains'
            }
        },
        {
            field: 'ShipCountry',
            headerText: 'Ship Country',
            width: 120,
            type: 'string',
            allowFiltering: true,
            allowSorting: true,
            // Only allow "contains" for country names
            filter: {
                type: 'Menu',
                operator: 'contains'
            }
        },
        {
            field: 'Freight',
            headerText: 'Freight',
            width: 100,
            format: 'C2', // Currency format
            type: 'number',
            textAlign: 'Right',
            allowFiltering: true,
            allowSorting: true,
            // Custom CSS class
            customAttributes: {
                class: 'freight-column'
            }
        },
        {
            field: 'Verified',
            headerText: 'Verified',
            width: 100,
            type: 'boolean',
            displayAsCheckBox: true,
            allowFiltering: true,
            allowSorting: true,
            textAlign: 'Center'
        }
    ];

    ngOnInit(): void {
        this.data = data;
        this.filterSettings = {
            type: 'Menu',
            // Define custom operators for different data types
            operators: {
                stringOperator: [
                    { value: 'contains', text: 'Contains' }
                    // Only show "contains" for string fields
                ],
                numberOperator: [
                    { value: 'equal', text: 'Equal' },
                    { value: 'greaterthan', text: 'Greater Than' },
                    { value: 'lessthan', text: 'Less Than' }
                    // Custom operators for number fields
                ],
                dateOperator: [
                    { value: 'equal', text: 'Equal' },
                    { value: 'greaterthan', text: 'After' },
                    { value: 'lessthan', text: 'Before' }
                    // Custom operators for date fields
                ],
                booleanOperator: [
                    { value: 'equal', text: 'Equal' }
                    // Only equality for boolean fields
                ]
            }
        };
    }

    onActionBegin(args: any): void {
        if (args.requestType === 'filtering') {
            // console.log('Filter Action Begin:', args);
            // console.log('Filter Parameters:', args.filterSettings);
            this.currentFilterParams = args.filterSettings || {};
        }
    }

    onActionComplete(args: any): void {
        if (args.requestType === 'filtering') {
            // console.log('Filter Action Complete:', args);
            const gridInstance = this.grid();
            if (gridInstance) {
                // console.log('Current Filter Columns:', gridInstance.filterSettings.columns);
                // console.log('Grid Query:', gridInstance.query);
                this.currentFilterParams = {
                    type: gridInstance.filterSettings.type,
                    mode: gridInstance.filterSettings.mode,
                    columns: gridInstance.filterSettings.columns,
                    operators: gridInstance.filterSettings.operators
                };
            }
        }
    }

    getFilterParamsDisplay(): string {
        return JSON.stringify(this.currentFilterParams, null, 2);
    }

    logCurrentFilters(): void {
        const gridInstance = this.grid();
        if (gridInstance) {
            // console.log('=== CURRENT GRID FILTER INFORMATION ===');
            // console.log('Filter Settings:', gridInstance.filterSettings);
            // console.log('Filter Columns:', gridInstance.filterSettings.columns);
            // console.log('Grid Query:', gridInstance.query);
            // console.log('Data Source Length:', gridInstance.dataSource ? (gridInstance.dataSource as any[]).length : 0);
            // console.log('Current View Data Length:', gridInstance.getCurrentViewRecords().length);

            // Log individual filter column details
            if (gridInstance.filterSettings.columns && gridInstance.filterSettings.columns.length > 0) {
                console.log('=== DETAILED FILTER COLUMNS ===');
                gridInstance.filterSettings.columns.forEach((filter: any, index: number) => {
                    console.log(`Filter ${index + 1}:`, {
                        field: filter.field,
                        operator: filter.operator,
                        value: filter.value,
                        predicate: filter.predicate,
                        matchCase: filter.matchCase,
                        ignoreAccent: filter.ignoreAccent,
                        type: filter.type
                    });
                });
            } else {
                console.log('No active filters');
            }
        }
    }

    // Method to dynamically add/modify columns (like ag-grid)
    addActionColumn(): void {
        const actionColumn: ColumnModel = {
            headerText: 'Actions',
            width: 120,
            template: '<button class="btn btn-primary">Edit</button> <button class="btn btn-danger">Delete</button>',
            allowFiltering: false,
            allowSorting: false
        };

        this.columns = [...this.columns, actionColumn];
    }

    // Method to hide/show columns dynamically
    toggleColumn(field: string): void {
        const gridInstance = this.grid();
        if (gridInstance) {
            const column = gridInstance.getColumnByField(field);
            if (column) {
                if (column.visible) {
                    gridInstance.hideColumns(field);
                } else {
                    gridInstance.showColumns(field);
                }
            }
        }
    }

    // Method to update column properties
    updateColumnWidth(field: string, width: number): void {
        const column = this.columns.find((col) => col.field === field);
        if (column) {
            column.width = width;
            // Refresh grid to apply changes
            const gridInstance = this.grid();
            if (gridInstance) {
                gridInstance.refresh();
            }
        }
    }

    // Method to set all string fields to only show "contains" filter
    setStringFiltersToContainsOnly(): void {
        const gridInstance = this.grid();
        if (gridInstance) {
            // Update filter settings to only show contains for strings
            gridInstance.filterSettings.operators = {
                stringOperator: [{ value: 'contains', text: 'Contains' }],
                numberOperator: [
                    { value: 'equal', text: 'Equal' },
                    { value: 'greaterthan', text: 'Greater Than' },
                    { value: 'lessthan', text: 'Less Than' }
                ],
                dateOperator: [
                    { value: 'equal', text: 'Equal' },
                    { value: 'greaterthan', text: 'After' },
                    { value: 'lessthan', text: 'Before' }
                ],
                booleanOperator: [{ value: 'equal', text: 'Equal' }]
            };
            gridInstance.refresh();
            console.log('String filters set to "Contains" only');
        }
    }

    // Method to reset filter operators to default
    resetFilterOperators(): void {
        const gridInstance = this.grid();
        if (gridInstance) {
            // Reset to default operators
            gridInstance.filterSettings.operators = {};
            gridInstance.refresh();
            console.log('Filter operators reset to default');
        }
    }

    // Method to customize filter for specific column
    setColumnFilterOperators(field: string, operators: string[]): void {
        const gridInstance = this.grid();
        if (gridInstance) {
            const column = gridInstance.getColumnByField(field);
            if (column) {
                // You can set specific operators for individual columns
                console.log(`Setting custom operators for ${field}:`, operators);
                // Note: For runtime changes, you might need to recreate the column
            }
        }
    }
}
