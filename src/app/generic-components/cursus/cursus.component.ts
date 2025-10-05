import { Component, model } from '@angular/core';
import { SmartElementComponent } from '../smart-element/smart-element.component';
import { DatePipe } from '@angular/common';
import { Address, Cursus, CursusResponseDTO } from '../../../api';
@Component({
    selector: 'app-cursus',
    imports: [SmartElementComponent, DatePipe],
    templateUrl: './cursus.component.html',
    styleUrl: './cursus.component.scss'
})
export class CursusComponent {
    cursus = model.required<CursusResponseDTO>();
}
