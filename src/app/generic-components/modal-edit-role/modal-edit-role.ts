import { Component, computed, inject, linkedSignal, model, OnInit, output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurableFormComponent } from '../configurable-form/configurable-form.component';
import { DrawerModule } from 'primeng/drawer';
import { EventInput } from '@fullcalendar/core/index.js';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Structure } from '../configurable-form/related-models';
import { LanguageCreateDTO, LanguageResponseDTO, LanguageUpdateDTO, RoleAppResponseDTO, RoleAppUpdateDTO, SlotResponseDTO } from '../../../api';
import { LanguagesMainService } from '../../shared/services/languages.store.service';
import { MessageService } from 'primeng/api';
import { UserMainService } from '../../shared/services/userMain.service';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-modal-edit-role',
    imports: [DialogModule, ConfigurableFormComponent, DrawerModule],
    templateUrl: './modal-edit-role.html',
    styleUrl: './modal-edit-role.scss'
})
export class ModalEditRoleComponent implements OnInit {
    fb = inject(FormBuilder);
    userService = inject(UserMainService);
    messageService = inject(MessageService);

    role = model<RoleAppResponseDTO | null>(null);
    visible = model(false);
    title = computed(() => "Modification d'un rôle");

    onSubmit = output();

    form = computed<Structure>(() => {
        return {
            id: 'language',
            name: 'Langue',
            label: 'Langue',
            formFieldGroups: [
                {
                    id: 'informations',
                    name: 'Informations',
                    label: 'Informations',
                    fields: [
                        { id: 'name', label: 'Nom', name: 'name', type: 'text', value: this.role()?.name, required: true, fullWidth: true, disabled: true },
                        { id: 'color', label: 'Couleur', name: 'color', type: 'color', value: this.role()?.color, required: true, fullWidth: true }
                        // { id: 'icon', label: 'Icône', name: 'icon', type: 'text', value: this.language()?.icon, required: false, fullWidth: true }
                    ]
                }
            ]
        };
    });

    ngOnInit(): void {}

    getTypes() {}

    async submit(event: FormGroup) {
        try {
            if (this.role()) {
                var newRole: RoleAppUpdateDTO = {
                    ...this.role()!,
                    color: event.value.informations.color
                };
                await firstValueFrom(this.userService.UpdateRole(this.role()!.id, newRole));
                this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Rôle mise à jour avec succès' });
                this.onSubmit.emit();
            }
        } catch (error) {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue lors de la gestion de la langue.' });
        } finally {
            this.cancel();
        }
    }

    cancel() {
        this.visible.set(false);
    }
}
