import { Component, inject, model, OnInit, signal } from '@angular/core';
import { AddressResponseDTO } from '../../../api';
import { SmartSectionComponent } from '../smart-section/smart-section.component';
import { AddressComponent } from '../address/address.component';
import { AddressesMainService } from '../../shared/services/addresses-main.service';
import { UserMainService } from '../../shared/services/userMain.service';
import { MessageService } from 'primeng/api';
import { ModalAddressComponent } from '../modal-address/modal-address.component';

@Component({
    selector: 'app-addresses-list',
    imports: [SmartSectionComponent, AddressComponent, ModalAddressComponent],
    templateUrl: './addresses-list.component.html',
    styleUrl: './addresses-list.component.scss'
})
export class AddressesListComponent implements OnInit {
    addressService = inject(AddressesMainService);
    user = inject(UserMainService).userConnected;
    messageService = inject(MessageService);

    title = 'Liste des Adresses';

    editMode = model(true);
    buttonIcon = model('pi pi-plus');
    showEditModal = signal(false);

    addresses = this.addressService.addresses;

    async ngOnInit() {
        await this.addressService.getAllAddressesByUser(this.user().id);
        console.log(this.addresses());
    }

    async openModal() {
        this.showEditModal.set(true);
    }

    cancel() {
        this.showEditModal.set(false);
    }
}
