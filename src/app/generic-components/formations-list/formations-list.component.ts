import { Component, model } from '@angular/core';
import { SmartSectionComponent } from '../smart-section/smart-section.component';

@Component({
    selector: 'app-formations-list',
    imports: [SmartSectionComponent],
    templateUrl: './formations-list.component.html',
    styleUrl: './formations-list.component.scss'
})
export class FormationsListComponent {
    title = model('Listes des formations');
    editMode = model(false);
    buttonIcon = model('pi pi-plus');
}
