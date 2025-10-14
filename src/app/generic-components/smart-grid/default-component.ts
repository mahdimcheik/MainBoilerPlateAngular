import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button'; // Exemple avec PrimeNG
import { ICellRendererAngularComp } from '../../shared/models/TableColumn ';

@Component({
    selector: 'app-action-button-renderer',
    standalone: true,
    imports: [ButtonModule],
    template: `
        <p-button icon="pi pi-pencil" styleClass="p-button-sm p-button-info" (click)="onEditClick()"> </p-button>
        <p-button icon="pi pi-trash" styleClass="p-button-sm p-button-danger" (click)="onDeleteClick()" [style]="{ 'margin-left': '4px' }"> </p-button>
    `
})
export class ActionButtonRendererComponent implements ICellRendererAngularComp {
    @Input() data: any; // Reçoit toute la ligne de données (rowData)
    @Input() params: any; // Reçoit les cellRendererParams

    // Exemple d'interaction vers le composant parent
    // @Output() action = new EventEmitter<any>();

    onEditClick() {
        console.log('Edit clicked for row:', this.data);
        // this.action.emit({ type: 'edit', row: this.data });
    }

    onDeleteClick() {
        console.log('Delete clicked for row:', this.params);
        // this.action.emit({ type: 'delete', row: this.data });
    }
}
