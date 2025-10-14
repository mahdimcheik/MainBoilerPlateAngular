import { CommonModule } from '@angular/common';
import { Component, effect, model, OnInit, signal, Type } from '@angular/core';
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

@Component({
    selector: 'app-smart-grid',
    imports: [TableModule, TagModule, IconFieldModule, InputTextModule, InputIconModule, MultiSelectModule, SelectModule, CommonModule, CustomSortComponent, InputTextModule, DatePickerModule],

    templateUrl: './smart-grid.component.html',
    styleUrl: './smart-grid.component.scss'
})
export class SmartGridComponent<T> implements OnInit {
    tableState = model<CustomTableState>(INITIAL_STATE);
    componentMap = signal<{ [key: string]: Type<ICellRendererAngularComp> }>({
        default: ActionButtonRendererComponent
    });
    customComponents = model<{ [key: string]: Type<ICellRendererAngularComp> }>({});
    data = model<T[]>([]);
    loading = model(false);
    columns = model.required<DynamicColDef[]>();

    constructor() {
        effect(() => {
            const temp = this.tableState();
            console.log('tableState', temp);
        });
    }

    ngOnInit(): void {
        const temp = this.customComponents();
        temp['default'] = ActionButtonRendererComponent;
        this.componentMap.set(temp);
    }
    getComponent(templateName: string | Type<ICellRendererAngularComp>): Type<ICellRendererAngularComp> {
        if (typeof templateName === 'string') {
            return this.componentMap()[templateName];
        }
        return templateName;
    }

    sortChange($event: SortOrder, column: DynamicColDef) {
        console.log($event);
        const newSort = [...this.tableState().sorts];
        const map = new Map<string, SortCriterion>();
        newSort.forEach((s) => {
            map.set(s.field, s);
        });
        map.set(column.sortField ?? '', { field: column.sortField ?? '', order: $event } as SortCriterion);
        this.tableState.update((state) => ({
            ...state,
            sorts: Array.from(map.values()),
            first: 0
        }));
    }

    public getSortOrderForField(field: string): SortOrder {
        const sortCriterion = this.tableState().sorts.find((s) => s.field === field);
        return sortCriterion ? sortCriterion.order : 0;
    }

    getFilterValue(field: string): any {
        return this.tableState().filters?.[field]?.value ?? '';
    }
    onInputchange($event: any, column: DynamicColDef) {
        const newFilters = { ...this.tableState().filters };
        newFilters[column.field] = { value: $event.target.value, matchMode: 'contains' };
        this.tableState.update((state) => ({
            ...state,
            filters: newFilters
        }));
    }

    onSelectchange($event: any, column: DynamicColDef) {
        const newFilters = { ...this.tableState().filters };
        newFilters[column.field] = { value: $event.value, matchMode: 'equals' };
        this.tableState.update((state) => ({
            ...state,
            filters: newFilters
        }));
    }

    // date time
    onDatechange($event: any, column: DynamicColDef) {
        const newFilters = { ...this.tableState().filters };
        newFilters[column.field] = { value: $event.value, matchMode: 'between' };
        this.tableState.update((state) => ({
            ...state,
            filters: newFilters
        }));
    }
}
