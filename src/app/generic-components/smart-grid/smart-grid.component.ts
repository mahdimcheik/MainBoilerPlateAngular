import { CommonModule } from '@angular/common';
import { Component, computed, effect, model, OnInit, signal, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TableModule } from 'primeng/table';
import { CustomTableState, DynamicColDef, ICellRendererAngularComp, INITIAL_STATE, SortCriterion, SortOrder } from '../../shared/models/TableColumn ';
import { ActionButtonRendererComponent } from './default-component';
import { CustomSortComponent } from './custom-sort/custom-sort.component';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';

/**
 * SmartGridComponent - A powerful, ag-grid-like data table component
 *
 * This component provides a customizable data grid with:
 * - Programmatic column definitions
 * - Custom state management for filters and sorting
 * - Client-side filtering and sorting (PrimeNG defaults disabled)
 * - Multiple filter types: text, select, array, date
 * - Custom cell renderers
 * - Pagination
 *
 * @example
 * ```typescript
 * // In your component:
 * columns = signal<DynamicColDef[]>([
 *   {
 *     field: 'name',
 *     header: 'Name',
 *     type: 'text',
 *     sortable: true,
 *     filterable: true
 *   },
 *   {
 *     field: 'status',
 *     header: 'Status',
 *     type: 'select',
 *     options: statuses,
 *     optionLabel: 'name',
 *     optionValue: 'id',
 *     filterable: true
 *   },
 *   {
 *     field: 'createdAt',
 *     header: 'Created',
 *     type: 'date',
 *     filterable: true
 *   }
 * ]);
 *
 * // In your template:
 * <app-smart-grid
 *   [(rawData)]="users"
 *   [(columns)]="columns"
 *   [(tableState)]="tableState"
 * />
 * ```
 *
 * @property {T[]} rawData - The raw unfiltered data array
 * @property {DynamicColDef[]} columns - Column definitions
 * @property {CustomTableState} tableState - Current state (filters, sorts, pagination)
 * @property {boolean} loading - Loading indicator
 * @property {Object} customComponents - Custom cell renderer components
 */
@Component({
    selector: 'app-smart-grid',
    imports: [TableModule, TagModule, IconFieldModule, InputTextModule, InputIconModule, MultiSelectModule, SelectModule, CommonModule, CustomSortComponent, DatePickerModule, FormsModule, ButtonModule, PopoverModule],
    templateUrl: './smart-grid.component.html',
    styleUrl: './smart-grid.component.scss'
})
export class SmartGridComponent<T extends Record<string, any>> implements OnInit {
    // Input models
    tableState = model<CustomTableState>(INITIAL_STATE);
    customComponents = model<{ [key: string]: Type<ICellRendererAngularComp> }>({});
    rawData = model<T[]>([]);
    loading = model(false);
    columns = model.required<DynamicColDef[]>();

    // Internal signals
    private componentMap = signal<{ [key: string]: Type<ICellRendererAngularComp> }>({
        default: ActionButtonRendererComponent
    });

    // Date filter configuration
    dateFilterMatchModes = [
        { label: 'Equal', value: 'dateIs' },
        { label: 'Before', value: 'dateBefore' },
        { label: 'After', value: 'dateAfter' }
    ];

    // Computed processed data (filtered and sorted)
    processedData = computed(() => {
        let data = [...this.rawData()];
        const state = this.tableState();

        // Apply filters
        data = this.applyFilters(data, state);

        // Apply sorting
        data = this.applySorting(data, state);

        return data;
    });

    constructor() {
        // Debug effect to monitor state changes
        effect(() => {
            const state = this.tableState();
            console.log('Table State Changed:', {
                filters: state.filters,
                sorts: state.sorts,
                first: state.first,
                rows: state.rows
            });
        });
    }

    ngOnInit(): void {
        // Initialize component map with custom components
        const customComps = this.customComponents();
        this.componentMap.set({
            ...customComps,
            default: ActionButtonRendererComponent
        });
    }

    // ========== Component Rendering ==========
    getComponent(templateName: string | Type<ICellRendererAngularComp>): Type<ICellRendererAngularComp> {
        if (typeof templateName === 'string') {
            return this.componentMap()[templateName] || this.componentMap()['default'];
        }
        return templateName;
    }

    // ========== Sorting Methods ==========
    sortChange(order: SortOrder, column: DynamicColDef): void {
        const sortField = column.sortField ?? column.field;
        const currentSorts = [...this.tableState().sorts];
        const sortMap = new Map<string, SortCriterion>(currentSorts.map((s) => [s.field, s]));

        if (order === 0) {
            // Remove sort
            sortMap.delete(sortField);
        } else {
            // Add or update sort
            sortMap.set(sortField, { field: sortField, order });
        }

        this.tableState.update((state) => ({
            ...state,
            sorts: Array.from(sortMap.values()),
            first: 0 // Reset to first page when sorting changes
        }));
    }

    getSortOrderForField(field: string): SortOrder {
        const sortCriterion = this.tableState().sorts.find((s) => s.field === field);
        return sortCriterion?.order ?? 0;
    }

    private applySorting(data: T[], state: CustomTableState): T[] {
        if (!state.sorts || state.sorts.length === 0) {
            return data;
        }

        return data.sort((a, b) => {
            for (const sort of state.sorts) {
                const aValue = this.getNestedValue(a, sort.field);
                const bValue = this.getNestedValue(b, sort.field);

                const comparison = this.compareValues(aValue, bValue);
                if (comparison !== 0) {
                    return comparison * sort.order;
                }
            }
            return 0;
        });
    }

    // ========== Filtering Methods ==========
    getFilterValue(field: string): any {
        return this.tableState().filters?.[field]?.value ?? null;
    }

    getDateFilterMatchMode(field: string): string {
        return this.tableState().filters?.[field]?.matchMode ?? 'dateIs';
    }

    onTextFilterChange(value: string, column: DynamicColDef): void {
        this.updateFilter(column.field, value, 'contains');
    }

    onSelectFilterChange(value: any, column: DynamicColDef): void {
        this.updateFilter(column.field, value, 'equals');
    }

    onArrayFilterChange(value: any[], column: DynamicColDef): void {
        this.updateFilter(column.field, value, 'in');
    }

    onDateFilterChange(date: Date | null, column: DynamicColDef, matchMode?: string): void {
        const mode = matchMode ?? this.getDateFilterMatchMode(column.field);
        this.updateFilter(column.field, date, mode);
    }

    onDateFilterMatchModeChange(matchMode: string, column: DynamicColDef): void {
        const currentFilter = this.tableState().filters?.[column.field];
        if (currentFilter) {
            this.updateFilter(column.field, currentFilter.value, matchMode);
        }
    }

    clearFilter(column: DynamicColDef): void {
        const filters = { ...this.tableState().filters };
        delete filters[column.field];

        this.tableState.update((state) => ({
            ...state,
            filters,
            first: 0
        }));
    }

    private updateFilter(field: string, value: any, matchMode: string): void {
        const filters = { ...this.tableState().filters };

        if (value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
            // Remove filter if value is empty
            delete filters[field];
        } else {
            filters[field] = { value, matchMode };
        }

        this.tableState.update((state) => ({
            ...state,
            filters,
            first: 0 // Reset to first page when filters change
        }));
    }

    private applyFilters(data: T[], state: CustomTableState): T[] {
        if (!state.filters || Object.keys(state.filters).length === 0) {
            return data;
        }

        return data.filter((row) => {
            return Object.entries(state.filters!).every(([field, filter]) => {
                const value = this.getNestedValue(row, field);
                return this.matchesFilter(value, filter.value, filter.matchMode);
            });
        });
    }

    private matchesFilter(value: any, filterValue: any, matchMode: string): boolean {
        if (filterValue === null || filterValue === undefined) {
            return true;
        }

        switch (matchMode) {
            case 'contains':
                return String(value ?? '')
                    .toLowerCase()
                    .includes(String(filterValue).toLowerCase());

            case 'equals':
                return value === filterValue;

            case 'in':
                return Array.isArray(filterValue) && filterValue.includes(value);

            case 'dateIs':
                return this.isSameDay(value, filterValue);

            case 'dateBefore':
                return new Date(value) < new Date(filterValue);

            case 'dateAfter':
                return new Date(value) > new Date(filterValue);

            default:
                return true;
        }
    }

    // ========== Utility Methods ==========
    private getNestedValue(obj: any, path: string): any {
        return path.split('.').reduce((acc, part) => acc?.[part], obj);
    }

    private compareValues(a: any, b: any): number {
        // Handle null/undefined
        if (a == null && b == null) return 0;
        if (a == null) return -1;
        if (b == null) return 1;

        // Handle dates
        if (a instanceof Date && b instanceof Date) {
            return a.getTime() - b.getTime();
        }

        // Handle numbers
        if (typeof a === 'number' && typeof b === 'number') {
            return a - b;
        }

        // Handle strings (case-insensitive)
        return String(a).toLowerCase().localeCompare(String(b).toLowerCase());
    }

    private isSameDay(date1: any, date2: any): boolean {
        if (!date1 || !date2) return false;
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    }

    // ========== Pagination Methods ==========
    onPageChange(event: any): void {
        this.tableState.update((state) => ({
            ...state,
            first: event.first,
            rows: event.rows
        }));
    }
}
