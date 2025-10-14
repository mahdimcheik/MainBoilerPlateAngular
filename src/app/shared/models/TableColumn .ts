import { Type } from '@angular/core';
import { Observable } from 'rxjs';

export interface ICellRendererAngularComp {
    data: any;
    params?: any;
}

export interface DynamicColDef {
    field: string;
    header: string;
    sortable?: boolean;
    sortField?: string;
    sortValue?: number;
    filterable?: boolean;
    type?: 'text' | 'date' | 'number' | 'boolean' | 'select' | 'custom' | 'array';
    valueFormatter?: (data: any) => string;
    cellRenderer?: Type<ICellRendererAngularComp> | string;
    cellRendererParams?: any;
    // select options
    options?: any[];
    fetchOptions?: () => Observable<any[]>;
    optionLabel?: string;
    optionValue?: string;
}

export type SortOrder = -1 | 0 | 1; // type de tri

export interface SortCriterion {
    // interface pour le tri, on peut trier par plusieurs champs
    field: string;
    order: SortOrder;
}

export interface CustomTableState {
    // interface pour l'état de la table
    first: number;
    rows: number;
    sorts: SortCriterion[];
    filters?: {
        [key: string]: {
            value: any;
            matchMode: string;
        };
    };
}

// L'état initial est aussi mis à jour
export const INITIAL_STATE: CustomTableState = {
    first: 0,
    rows: 10,
    sorts: [],
    filters: {}
};
