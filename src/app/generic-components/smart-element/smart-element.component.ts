import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, model, output, TemplateRef } from '@angular/core';

@Component({
    selector: 'app-smart-element',
    imports: [NgTemplateOutlet],
    templateUrl: './smart-element.component.html',
    styleUrl: './smart-element.component.scss'
})
export class SmartElementComponent {
    title = model.required();
    editMode = model(false);

    editButtonIcon = model('pi pi-pencil');
    onEditClick = output<void>();

    deleteButtonIcon = model('pi pi-trash');
    onDeleteClick = output<void>();

    mainContent = contentChild<TemplateRef<any>>('main');
}
