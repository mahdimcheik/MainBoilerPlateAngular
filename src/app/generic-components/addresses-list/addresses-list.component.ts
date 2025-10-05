import { Component, model } from '@angular/core';
import { AddressResponseDTO } from '../../../api';
import { SmartSectionComponent } from '../smart-section/smart-section.component';
import { AddressComponent } from '../address/address.component';

@Component({
    selector: 'app-addresses-list',
    imports: [SmartSectionComponent, AddressComponent],
    templateUrl: './addresses-list.component.html',
    styleUrl: './addresses-list.component.scss'
})
export class AddressesListComponent {
    title = model('Listes des adresses');
    editMode = model(true);
    buttonIcon = model('pi pi-plus');

    addresses: AddressResponseDTO[] = [
        {
            id: '1',
            street: 'street 1',
            city: 'city 1',
            state: 'state 1',
            zipCode: 'zipCode 1',
            country: 'country 1',
            createdAt: new Date(),
            userId: 'user1'
        },
        {
            id: '2',
            street: 'street 2',
            city: 'city 2',
            state: 'state 2',
            zipCode: 'zipCode 2',
            country: 'country 2',
            createdAt: new Date(),
            userId: 'user2'
        }
    ];
}
