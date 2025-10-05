import { Component, model } from '@angular/core';
import { SmartElementComponent } from '../smart-element/smart-element.component';
import { DatePipe } from '@angular/common';
import { Address } from '../../../api';

@Component({
    selector: 'app-address',
    imports: [SmartElementComponent, DatePipe],
    templateUrl: './address.component.html',
    styleUrl: './address.component.scss'
})
export class AddressComponent {
    address = model.required<Address>();
}
