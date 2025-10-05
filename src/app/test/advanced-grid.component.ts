import { Component, OnInit, viewChild } from '@angular/core';
import { GridModule, FilterService, PageService, GridComponent, ColumnModel, SortService, ResizeService } from '@syncfusion/ej2-angular-grids';
import { FilterSettingsModel, PageSettingsModel, SortSettingsModel } from '@syncfusion/ej2-angular-grids';
import { data } from './data';

@Component({
    imports: [GridModule],
    providers: [FilterService, PageService, SortService, ResizeService],
    standalone: true,
    selector: 'advanced-grid',
    template: `
        <h2>Advanced Syncfusion Grid (ag-grid style column definitions)</h2>

        <ejs-grid
            [dataSource]="data"
            [columns]="columns"
            [allowPaging]="true"
            [pageSettings]="pageSettings"
            [allowFiltering]="true"
            [filterSettings]="filterSettings"
            [allowSorting]="true"
            [sortSettings]="sortSettings"
            [allowResizing]="true"
            height="400px"
            #grid
        >
        </ejs-grid>

        <div style="margin-top: 20px; padding: 15px; border: 1px solid #ddd; background: #f9f9f9;">
            <h3>Grid Controls</h3>
            <div style="margin-bottom: 10px;">
                <button (click)="addCalculatedColumn()" style="margin-right: 10px; padding: 8px 12px;">Add Total Column</button>
                <button (click)="addStatusColumn()" style="margin-right: 10px; padding: 8px 12px;">Add Status Column</button>
                <button (click)="toggleColumn('Freight')" style="margin-right: 10px; padding: 8px 12px;">Toggle Freight</button>
                <button (click)="exportToExcel()" style="padding: 8px 12px;">Export to Excel</button>
            </div>

            <h4>Column API Examples:</h4>
            <div>
                <button (click)="getColumnDefs()" style="margin-right: 10px; padding: 5px 10px;">Log Column Definitions</button>
                <button (click)="setColumnVisible('OrderDate', false)" style="margin-right: 10px; padding: 5px 10px;">Hide Order Date</button>
                <button (click)="setColumnVisible('OrderDate', true)" style="margin-right: 10px; padding: 5px 10px;">Show Order Date</button>
                <button (click)="moveColumn('CustomerID', 0)" style="padding: 5px 10px;">Move Customer ID to First</button>
            </div>
        </div>
    `
})
export class AdvancedGridComponent implements OnInit {
    public data?: object[];
    public filterSettings?: FilterSettingsModel;
    public pageSettings?: PageSettingsModel;
    public sortSettings?: SortSettingsModel;
    public grid = viewChild<GridComponent>('grid');

    // Column definitions - similar to ag-grid colDefs
    public columns: ColumnModel[] = [
        {
            field: 'OrderID',
            headerText: 'Order ID',
            textAlign: 'Right',
            width: 100,
            type: 'number',
            isPrimaryKey: true,
            allowFiltering: true,
            allowSorting: true,
            allowResizing: true,
            // Custom header template
            headerTemplate: '<div style="color: blue; font-weight: bold;">📋 Order ID</div>'
        },
        {
            field: 'CustomerID',
            headerText: 'Customer',
            width: 120,
            type: 'string',
            allowFiltering: true,
            allowSorting: true,
            allowResizing: true,
            // Cell template for custom rendering
            template: '<div style="font-weight: bold; color: #007bff;">${CustomerID}</div>'
        },
        {
            field: 'OrderDate',
            headerText: 'Order Date',
            width: 130,
            format: { type: 'date', format: 'dd/MM/yyyy' },
            type: 'date',
            allowFiltering: true,
            allowSorting: true,
            allowResizing: true
        },
        {
            field: 'ShipCity',
            headerText: 'Ship City',
            width: 120,
            type: 'string',
            allowFiltering: true,
            allowSorting: true,
            allowResizing: true,
            clipMode: 'EllipsisWithTooltip'
        },
        {
            field: 'ShipCountry',
            headerText: 'Country',
            width: 120,
            type: 'string',
            allowFiltering: true,
            allowSorting: true,
            allowResizing: true,
            // Custom cell renderer with conditional formatting
            template: '<div style="padding: 4px; border-radius: 4px; text-align: center; background-color: #e3f2fd;">${ShipCountry}</div>'
        },
        {
            field: 'Freight',
            headerText: 'Freight',
            width: 120,
            format: 'C2',
            type: 'number',
            textAlign: 'Right',
            allowFiltering: true,
            allowSorting: true,
            allowResizing: true,
            // Custom CSS class for styling
            customAttributes: { class: 'freight-column' },
            // Conditional formatting
            template: '<div [style.color]="data.Freight > 50 ? \'red\' : \'green\'" style="font-weight: bold;">${Freight}</div>'
        },
        {
            field: 'Verified',
            headerText: 'Verified',
            width: 100,
            type: 'boolean',
            displayAsCheckBox: true,
            allowFiltering: true,
            allowSorting: true,
            allowResizing: true,
            textAlign: 'Center'
        }
    ];

    ngOnInit(): void {
        this.data = data;

        this.filterSettings = {
            type: 'Menu',
            showFilterBarStatus: true
        };

        this.pageSettings = {
            pageSize: 10,
            pageSizes: [5, 10, 20, 50]
        };

        this.sortSettings = {
            allowUnsort: true
        };
    }

    // Methods similar to ag-grid API
    getColumnDefs(): void {
        console.log('Current Column Definitions:', this.columns);
        console.log('Grid Columns:', this.grid()?.columns);
    }

    setColumnVisible(field: string, visible: boolean): void {
        const gridInstance = this.grid();
        if (gridInstance) {
            if (visible) {
                gridInstance.showColumns(field);
            } else {
                gridInstance.hideColumns(field);
            }
        }
    }

    moveColumn(field: string, toIndex: number): void {
        const gridInstance = this.grid();
        if (gridInstance && toIndex < gridInstance.columns.length) {
            const targetColumn = gridInstance.columns[toIndex] as any;
            gridInstance.reorderColumns(field, targetColumn.field || targetColumn);
        }
    }

    addCalculatedColumn(): void {
        const calculatedColumn: ColumnModel = {
            field: 'Total',
            headerText: 'Total Value',
            width: 120,
            textAlign: 'Right',
            allowFiltering: false,
            allowSorting: false,
            // Calculated field using valueAccessor (similar to ag-grid)
            valueAccessor: (field: string, data: any, column: any) => {
                return (data.Freight * 1.2).toFixed(2); // Adding 20% tax
            },
            template: '<div style="font-weight: bold; color: green;">$${Total}</div>'
        };

        this.columns = [...this.columns, calculatedColumn];
    }

    addStatusColumn(): void {
        const statusColumn: ColumnModel = {
            headerText: 'Status',
            width: 100,
            allowFiltering: true,
            allowSorting: false,
            // Custom cell renderer
            template: `<div [style.background-color]="getStatusColor(data)" 
                           style="padding: 4px; border-radius: 12px; text-align: center; color: white; font-size: 12px;">
                           {{getStatusText(data)}}
                       </div>`
        };

        this.columns = [...this.columns, statusColumn];
    }

    toggleColumn(field: string): void {
        const gridInstance = this.grid();
        if (gridInstance) {
            const column = gridInstance.getColumnByField(field);
            if (column && column.visible !== false) {
                gridInstance.hideColumns(field);
            } else {
                gridInstance.showColumns(field);
            }
        }
    }

    exportToExcel(): void {
        const gridInstance = this.grid();
        if (gridInstance) {
            // Note: You need to add ExcelExportService to providers for this to work
            // gridInstance.excelExport();
            console.log('Excel export would be triggered here');
        }
    }

    // Utility methods for templates
    getCountryColor(country: string): string {
        const colors: { [key: string]: string } = {
            France: '#ffebee',
            Germany: '#e3f2fd',
            USA: '#fff3e0',
            Brazil: '#e8f5e8'
        };
        return colors[country] || '#f5f5f5';
    }

    getStatusColor(data: any): string {
        if (data.Freight > 100) return '#f44336'; // Red for high freight
        if (data.Freight > 50) return '#ff9800'; // Orange for medium freight
        return '#4caf50'; // Green for low freight
    }

    getStatusText(data: any): string {
        if (data.Freight > 100) return 'HIGH';
        if (data.Freight > 50) return 'MEDIUM';
        return 'LOW';
    }
}
