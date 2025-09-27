import { TemplateRef } from '@angular/core';
/**
 * Interface représentant une colonne de tableau.
 * @obsolete Utiliser PrimeNG Table à la place
 */
export interface TableColumn {
    field: string;
    header: string;
    type?: 'text' | 'date' | 'number' | 'boolean' | 'custom';
    filter?: boolean;
    sortable?: boolean;
    width?: string;
    templateName?: string;
}
