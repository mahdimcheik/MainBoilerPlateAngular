import { Type } from '@angular/core';

export interface ICellRendererAngularComp {
    data: any;
    params?: any;
}

export interface DynamicColDef {
    field: string;
    header: string;
    type?: 'text' | 'date' | 'number' | 'boolean' | 'custom';
    valueFormatter?: (data: any) => string;
    cellRenderer?: Type<ICellRendererAngularComp> | string;
    cellRendererParams?: any;
}
