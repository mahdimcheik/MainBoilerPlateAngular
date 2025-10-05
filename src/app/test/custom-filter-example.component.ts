import { Component, OnInit, viewChild } from '@angular/core';
import { GridModule, FilterService, PageService, GridComponent, ColumnModel } from '@syncfusion/ej2-angular-grids';
import { FilterSettingsModel, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { data } from './data';

@Component({
    imports: [GridModule],
    providers: [FilterService, PageService],
    standalone: true,
    selector: 'custom-filter-grid',
    template: `
        <h2>Custom Filter Operators Example</h2>

        <div style="margin-bottom: 15px; padding: 10px; background: #f0f8ff; border: 1px solid #ccc;">
            <h4>Filter Configuration Examples:</h4>
            <ul style="margin: 10px 0;">
                <li><strong>Text Fields:</strong> Only "Contains" operator</li>
                <li><strong>Number Fields:</strong> Equal, Greater Than, Less Than</li>
                <li><strong>Date Fields:</strong> Equal, After, Before</li>
                <li><strong>Boolean Fields:</strong> Only Equal</li>
            </ul>
        </div>

        <ejs-grid [dataSource]="data" [columns]="columns" [allowPaging]="true" [pageSettings]="pageSettings" [allowFiltering]="true" [filterSettings]="filterSettings" height="400px" #grid> </ejs-grid>

        <div style="margin-top: 20px; padding: 15px; border: 1px solid #ddd; background: #f9f9f9;">
            <h3>Filter Controls</h3>
            <div style="margin-bottom: 10px;">
                <button (click)="setContainsOnlyForAllText()" style="margin-right: 10px; padding: 8px 12px;">Text: Contains Only</button>
                <button (click)="setCustomNumberFilters()" style="margin-right: 10px; padding: 8px 12px;">Numbers: Custom Operators</button>
                <button (click)="setMinimalDateFilters()" style="margin-right: 10px; padding: 8px 12px;">Dates: Before/After Only</button>
                <button (click)="resetToDefault()" style="padding: 8px 12px;">Reset to Default</button>
            </div>

            <div style="margin-top: 15px;">
                <h4>Individual Column Filter Examples:</h4>
                <button (click)="setCustomerIdExactMatch()" style="margin-right: 10px; padding: 5px 10px;">Customer ID: Exact Match Only</button>
                <button (click)="setFreightRangeFilter()" style="margin-right: 10px; padding: 5px 10px;">Freight: Range Filters Only</button>
                <button (click)="logCurrentFilterConfig()" style="padding: 5px 10px;">Log Filter Config</button>
            </div>
        </div>
    `
})
export class CustomFilterGridComponent implements OnInit {
    public data?: object[];
    public filterSettings?: FilterSettingsModel;
    public pageSettings?: PageSettingsModel;
    public grid = viewChild<GridComponent>('grid');

    // Columns with custom filter configurations
    public columns: ColumnModel[] = [
        {
            field: 'OrderID',
            headerText: 'Order ID',
            width: 100,
            type: 'number',
            textAlign: 'Right',
            allowFiltering: true,
            // Custom filter for OrderID - only exact match
            filter: {
                type: 'Menu',
                operator: 'equal'
            }
        },
        {
            field: 'CustomerID',
            headerText: 'Customer ID',
            width: 120,
            type: 'string',
            allowFiltering: true,
            // Only contains for customer search
            filter: {
                type: 'Menu',
                operator: 'contains'
            }
        },
        {
            field: 'OrderDate',
            headerText: 'Order Date',
            width: 130,
            type: 'date',
            format: { type: 'date', format: 'dd/MM/yyyy' },
            allowFiltering: true,
            // Date range filtering
            filter: {
                type: 'Menu',
                operator: 'equal'
            }
        },
        {
            field: 'ShipCity',
            headerText: 'Ship City',
            width: 120,
            type: 'string',
            allowFiltering: true,
            // City search - contains only
            filter: {
                type: 'Menu',
                operator: 'contains'
            }
        },
        {
            field: 'ShipCountry',
            headerText: 'Country',
            width: 120,
            type: 'string',
            allowFiltering: true,
            // Country - starts with or contains
            filter: {
                type: 'Menu',
                operator: 'contains'
            }
        },
        {
            field: 'Freight',
            headerText: 'Freight',
            width: 120,
            type: 'number',
            format: 'C2',
            textAlign: 'Right',
            allowFiltering: true,
            // Freight - range filters
            filter: {
                type: 'Menu',
                operator: 'greaterthan'
            }
        },
        {
            field: 'Verified',
            headerText: 'Verified',
            width: 100,
            type: 'boolean',
            displayAsCheckBox: true,
            allowFiltering: true,
            textAlign: 'Center',
            // Boolean - only equal
            filter: {
                type: 'Menu',
                operator: 'equal'
            }
        }
    ];

    ngOnInit(): void {
        this.data = data;
        this.pageSettings = { pageSize: 10 };

        // Initialize with custom filter operators
        this.filterSettings = {
            type: 'Menu',
            // Define custom operators for different data types
            operators: {
                // String fields - only contains
                stringOperator: [{ value: 'contains', text: 'Contains' }],
                // Number fields - range operations
                numberOperator: [
                    { value: 'equal', text: 'Equal' },
                    { value: 'greaterthan', text: 'Greater Than' },
                    { value: 'lessthan', text: 'Less Than' },
                    { value: 'greaterthanorequal', text: 'Greater Than or Equal' },
                    { value: 'lessthanorequal', text: 'Less Than or Equal' }
                ],
                // Date fields - before/after/equal
                dateOperator: [
                    { value: 'equal', text: 'On Date' },
                    { value: 'greaterthan', text: 'After' },
                    { value: 'lessthan', text: 'Before' }
                ],
                // Boolean fields - only equal
                booleanOperator: [{ value: 'equal', text: 'Equal' }]
            }
        };
    }

    // Set all text fields to only show "contains"
    setContainsOnlyForAllText(): void {
        this.updateFilterOperators({
            stringOperator: [{ value: 'contains', text: 'Contains' }]
        });
        console.log('All text fields set to "Contains" only');
    }

    // Custom number field operators
    setCustomNumberFilters(): void {
        this.updateFilterOperators({
            numberOperator: [
                { value: 'equal', text: 'Exactly' },
                { value: 'greaterthan', text: 'More Than' },
                { value: 'lessthan', text: 'Less Than' }
            ]
        });
        console.log('Number fields set to custom operators');
    }

    // Minimal date filters
    setMinimalDateFilters(): void {
        this.updateFilterOperators({
            dateOperator: [
                { value: 'greaterthan', text: 'After' },
                { value: 'lessthan', text: 'Before' }
            ]
        });
        console.log('Date fields set to Before/After only');
    }

    // Reset to default Syncfusion operators
    resetToDefault(): void {
        const gridInstance = this.grid();
        if (gridInstance) {
            // Clear custom operators to use defaults
            gridInstance.filterSettings.operators = {};
            gridInstance.refresh();
            console.log('Reset to default filter operators');
        }
    }

    // Set Customer ID to exact match only
    setCustomerIdExactMatch(): void {
        this.updateFilterOperators({
            stringOperator: [{ value: 'equal', text: 'Exact Match' }]
        });
        console.log('Customer ID set to exact match only');
    }

    // Set Freight to range filters only
    setFreightRangeFilter(): void {
        this.updateFilterOperators({
            numberOperator: [
                { value: 'greaterthan', text: 'Greater Than' },
                { value: 'lessthan', text: 'Less Than' },
                { value: 'greaterthanorequal', text: 'At Least' },
                { value: 'lessthanorequal', text: 'At Most' }
            ]
        });
        console.log('Freight set to range filters only');
    }

    // Utility method to update filter operators
    private updateFilterOperators(newOperators: any): void {
        const gridInstance = this.grid();
        if (gridInstance) {
            // Merge with existing operators
            gridInstance.filterSettings.operators = {
                ...gridInstance.filterSettings.operators,
                ...newOperators
            };
            gridInstance.refresh();
        }
    }

    // Log current filter configuration
    logCurrentFilterConfig(): void {
        const gridInstance = this.grid();
        if (gridInstance) {
            console.log('=== CURRENT FILTER CONFIGURATION ===');
            console.log('Filter Settings:', gridInstance.filterSettings);
            console.log('Available Operators:', gridInstance.filterSettings.operators);

            console.log('=== COLUMN FILTER CONFIGURATIONS ===');
            this.columns.forEach((column) => {
                if (column.allowFiltering && column.filter) {
                    console.log(`${column.field}:`, {
                        type: column.type,
                        defaultOperator: column.filter.operator,
                        filterType: column.filter.type
                    });
                }
            });
        }
    }
}

// Available Filter Operators Reference:
/*
String Operators:
- equal, notequal, contains, doesnotcontain, startswith, endswith, isnull, isnotnull, isempty, isnotempty

Number Operators:
- equal, notequal, greaterthan, greaterthanorequal, lessthan, lessthanorequal, isnull, isnotnull

Date Operators:
- equal, notequal, greaterthan, greaterthanorequal, lessthan, lessthanorequal, isnull, isnotnull

Boolean Operators:
- equal, notequal, isnull, isnotnull
*/
