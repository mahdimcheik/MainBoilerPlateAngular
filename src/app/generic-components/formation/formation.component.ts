import { Component, model } from '@angular/core';
import { SmartSectionComponent } from '../smart-section/smart-section.component';
import { Formation } from '../../../api';
import { SmartElementComponent } from '../smart-element/smart-element.component';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-formation',
    imports: [SmartElementComponent, DatePipe],
    templateUrl: './formation.component.html',
    styleUrl: './formation.component.scss'
})
export class FormationComponent {
    formation = model.required<Formation>();
}
