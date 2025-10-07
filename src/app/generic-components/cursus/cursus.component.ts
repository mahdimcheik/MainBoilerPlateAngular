import { Component, model, signal } from '@angular/core';
import { SmartElementComponent } from '../smart-element/smart-element.component';
import { DatePipe } from '@angular/common';
import { Address, Cursus, CursusResponseDTO } from '../../../api';
import { ModalCursusComponent } from '../modal-cursus/modal-cursus.component';
@Component({
    selector: 'app-cursus',
    imports: [SmartElementComponent, DatePipe, ModalCursusComponent],
    templateUrl: './cursus.component.html',
    styleUrl: './cursus.component.scss'
})
export class CursusComponent {
    cursus = model.required<CursusResponseDTO>();
    showEditModal = signal(false);

    cancel() {
        this.showEditModal.set(false);
    }

    openEditModal() {
        this.showEditModal.set(true);
    }
    deleteCursus() {}

    submit(event: any) {
        console.log(event);
        this.showEditModal.set(false);
    }
}
