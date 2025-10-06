import { Component, computed, inject, model, signal } from '@angular/core';
import { SmartSectionComponent } from '../smart-section/smart-section.component';
import { CursusComponent } from '../cursus/cursus.component';
import { Cursus, CursusCreateDTO, CursusResponseDTO } from '../../../api';
import { CursusesMainServiceService } from '../../shared/services/cursuses-main-service.service';
import { Structure } from '../configurable-form/related-models';
import { Drawer } from 'primeng/drawer';
import { Footer } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ConfigurableFormComponent } from '../configurable-form/configurable-form.component';
import { FormGroup } from '@angular/forms';
import { UserMainService } from '../../shared/services/userMain.service';

@Component({
    selector: 'app-cursuses-list',
    imports: [SmartSectionComponent, CursusComponent, Drawer, DialogModule, ConfigurableFormComponent],
    templateUrl: './cursuses-list.component.html',
    styleUrl: './cursuses-list.component.scss'
})
export class CursusesListComponent {
    cursusService = inject(CursusesMainServiceService);
    user = inject(UserMainService).userConnected;

    title = model('Listes des Coursus');
    editMode = model(true);
    buttonIcon = model('pi pi-plus');
    showEditModal = signal(false);

    cursuses = this.cursusService.cursuses;

    cursusForm = computed<Structure>(() => {
        const levels = this.cursusService.cursuses;
        return {
            id: 'cursus',
            name: 'Cursus',
            label: 'Cursus',
            required: true,
            formFieldGroups: [
                {
                    id: 'informations',
                    label: 'Informations',
                    name: 'informations',
                    required: true,
                    fields: [
                        { id: 'title', label: 'Titre', name: 'title', type: 'text', required: true },
                        { id: 'description', label: 'Description', name: 'description', type: 'textarea', required: true },
                        // { id: 'teacherId', label: 'Enseignant', name: 'teacherId', type: 'select', options: [], required: true, value: this.user().id },
                        { id: 'color', label: 'Couleur', name: 'color', type: 'color', required: true }
                    ]
                }
            ]
        };
    });

    async openModal() {
        this.showEditModal.set(true);
    }

    cancel() {
        this.showEditModal.set(false);
    }

    submit(cursus: FormGroup) {
        this.cursusService.createCursus(cursus.value as CursusCreateDTO);
        this.showEditModal.set(false);
    }
}
