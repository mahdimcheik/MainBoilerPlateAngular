import { Component, computed, inject, model, OnInit, signal } from '@angular/core';
import { SmartSectionComponent } from '../smart-section/smart-section.component';
import { CursusComponent } from '../cursus/cursus.component';
import { Cursus, CursusCreateDTO, CursusResponseDTO } from '../../../api';
import { CursusesMainServiceService } from '../../shared/services/cursuses-main-service.service';
import { Structure } from '../configurable-form/related-models';
import { Drawer } from 'primeng/drawer';
import { Footer, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ConfigurableFormComponent } from '../configurable-form/configurable-form.component';
import { FormGroup } from '@angular/forms';
import { UserMainService } from '../../shared/services/userMain.service';
import { Message } from 'primeng/message';
import { ModalCursusComponent } from '../modal-cursus/modal-cursus.component';

@Component({
    selector: 'app-cursuses-list',
    imports: [SmartSectionComponent, CursusComponent, Drawer, DialogModule, ConfigurableFormComponent, ModalCursusComponent],
    templateUrl: './cursuses-list.component.html',
    styleUrl: './cursuses-list.component.scss'
})
export class CursusesListComponent implements OnInit {
    cursusService = inject(CursusesMainServiceService);
    user = inject(UserMainService).userConnected;
    messageService = inject(MessageService);

    title = 'Listes des Coursus';

    editMode = model(true);
    buttonIcon = model('pi pi-plus');
    showEditModal = signal(false);

    cursuses = this.cursusService.cursuses;

    async ngOnInit() {
        await this.cursusService.getCursusByTeacher(this.user().id);
        console.log(this.cursuses());
    }

    async openModal() {
        this.showEditModal.set(true);
    }

    cancel() {
        this.showEditModal.set(false);
    }
}
