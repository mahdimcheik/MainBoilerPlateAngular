import { Component, computed, inject, linkedSignal, model, OnInit, signal } from '@angular/core';
import { SmartSectionComponent } from '../smart-section/smart-section.component';
import { Image } from 'primeng/image';
import { LanguageResponseDTO, LanguagesService, ProgrammingLanguageResponseDTO, UserResponseDTO, UserUpdateDTO } from '../../../api';
import { ChipsListComponent } from '../chips-list/chips-list.component';
import { DialogModule } from 'primeng/dialog';
import { DrawerModule } from 'primeng/drawer';
import { ConfigurableFormComponent } from '../configurable-form/configurable-form.component';
import { Structure } from '../configurable-form/related-models';
import { LanguagesStoreService } from '../../shared/services/languages.store.service';
import { UserMainService } from '../../shared/services/userMain.service';
import { firstValueFrom } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CursusesMainService } from '../../shared/services/cursuses-main.service';

@Component({
    selector: 'app-personnal-infos',
    imports: [SmartSectionComponent, Image, DrawerModule, DialogModule, ConfigurableFormComponent, ChipsListComponent],
    templateUrl: './personnal-infos.component.html',
    styleUrl: './personnal-infos.component.scss'
})
export class PersonnalInfosComponent implements OnInit {
    languagesService = inject(LanguagesStoreService);
    userservice = inject(UserMainService);
    messageService = inject(MessageService);
    cursusService = inject(CursusesMainService);

    user = this.userservice.userConnected;
    programmingLanguages = this.languagesService.programmingLanguages;
    languages = this.languagesService.languages;

    // options pour les multiselects
    languagesOptions = this.languagesService.allLanguages;
    programmingLanguagesOptions = this.languagesService.allProgrammingLanguages;

    personnalInfosFormConfig = linkedSignal<Structure>(() => {
        const languagesOptions = this.languagesOptions();
        const programmingLanguagesOptions = this.programmingLanguagesOptions();

        return {
            id: 'personnal-infos-form',
            name: 'personnal-infos-form',
            label: 'Informations personnelles',
            description: "Formulaire pour éditer les informations personnelles de l'utilisateur",
            icon: 'pi pi-user',
            hideCancelButton: false,
            hideSubmitButton: false,
            formFields: [
                { id: 'firstName', label: 'Prénom', name: 'firstName', type: 'text', required: true, value: this.user().firstName },
                { id: 'lastName', label: 'Nom', name: 'lastName', type: 'text', required: true, value: this.user().lastName },
                { id: 'dateOfBirth', label: 'Date de naissance', name: 'dateOfBirth', type: 'date', required: true, fullWidth: true, value: new Date(this.user().dateOfBirth ?? '') },
                { id: 'title', label: 'Titre', name: 'title', type: 'text', required: true, fullWidth: true, value: this.user().title },
                {
                    id: 'languagesIds',
                    label: 'Langues parlées',
                    name: 'languagesIds',
                    type: 'multiselect',
                    compareKey: 'id',
                    displayKey: 'name',
                    value: this.languages().map((l) => l.id),
                    fullWidth: true,
                    options: languagesOptions
                },
                {
                    id: 'programmingLanguagesIds',
                    label: 'Langages de programmation',
                    name: 'programmingLanguagesIds',
                    type: 'multiselect',
                    compareKey: 'id',
                    displayKey: 'name',
                    value: this.programmingLanguages().map((l) => l.id),
                    fullWidth: true,
                    options: programmingLanguagesOptions
                },
                { id: 'description', label: 'Description', name: 'description', type: 'textarea', required: false, value: this.user().description }
            ]
        };
    });

    ngOnInit() {
        this.loadUserData();
    }

    private async loadUserData() {
        try {
            await this.languagesService.loadLanguages();
            await this.languagesService.loadProgrammingLanguages();
            // charger les langues et langages de programmation de l'utilisateur
            await this.languagesService.getLanguageByUserId(this.user().id);
            await this.languagesService.getProgrammingLanguageByUserId(this.user().id);

            // charger les categories et les niveaux de cursus
            await this.cursusService.loadAllCategories();
            await this.cursusService.loadAllLevels();
        } catch {}
    }

    editPersonnalInfosDialogVisible = model<boolean>(false);

    EditPersonnalInfos() {
        this.editPersonnalInfosDialogVisible.set(true);
    }

    async submit(event: FormGroup<any>) {
        console.log('submit', event.value);
        try {
            const updatedUser: UserUpdateDTO = {
                firstName: event.value.firstName,
                lastName: event.value.lastName,
                dateOfBirth: event.value.dateOfBirth,
                title: event.value.title,
                languagesIds: event.value.languagesIds,
                programmingLanguagesIds: event.value.programmingLanguagesIds,
                description: event.value.description
            };
            await firstValueFrom(this.userservice.updatePersonnalInfos(updatedUser));

            // recharger les infos de l'utilisateur
            await this.languagesService.getLanguageByUserId(this.user().id);
            await this.languagesService.getProgrammingLanguageByUserId(this.user().id);
            //fermer le popup
        } catch {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue lors de la mise à jour des informations personnelles.' });
        } finally {
            this.editPersonnalInfosDialogVisible.set(false);
        }
    }
    cancel() {
        this.editPersonnalInfosDialogVisible.set(false);
    }
}
