import { Component, inject, model, OnInit, signal } from '@angular/core';
import { SmartSectionComponent } from '../smart-section/smart-section.component';
import { FormationResponseDTO } from '../../../api';
import { FormationComponent } from '../formation/formation.component';
import { FormationsMainService } from '../../shared/services/formations-main.service';
import { UserMainService } from '../../shared/services/userMain.service';
import { MessageService } from 'primeng/api';
import { ModalFormationComponent } from '../modal-formation/modal-formation.component';

@Component({
    selector: 'app-formations-list',
    imports: [SmartSectionComponent, FormationComponent, ModalFormationComponent],
    templateUrl: './formations-list.component.html',
    styleUrl: './formations-list.component.scss'
})
export class FormationsListComponent implements OnInit {
    formationService = inject(FormationsMainService);
    user = inject(UserMainService).userConnected;
    messageService = inject(MessageService);

    title = 'Liste des Formations';

    editMode = model(true);
    buttonIcon = model('pi pi-plus');
    showEditModal = signal(false);

    formations = this.formationService.formations;

    async ngOnInit() {
        await this.formationService.getAllFormationsByUser(this.user().id);
        console.log(this.formations());
    }

    async openModal() {
        this.showEditModal.set(true);
    }

    cancel() {
        this.showEditModal.set(false);
    }
}
