import { Component, model, signal } from '@angular/core';
import { SmartSectionComponent } from '../smart-section/smart-section.component';
import { Image } from 'primeng/image';
import { LanguageResponseDTO, UserResponseDTO } from '../../../api';
import { ChipsListComponent } from '../chips-list/chips-list.component';

@Component({
    selector: 'app-personnal-infos',
    imports: [SmartSectionComponent, Image, ChipsListComponent],
    templateUrl: './personnal-infos.component.html',
    styleUrl: './personnal-infos.component.scss'
})
export class PersonnalInfosComponent {
    user = signal<UserResponseDTO>({
        id: '',
        firstName: 'John',
        lastName: 'Wick',
        email: 'john.wick@example.com',
        description: 'A retired hitman',
        roles: ['User']
    });
    languages = signal<LanguageResponseDTO[]>([
        {
            id: '1',
            name: 'JavaScript',
            icon: 'pi pi-code',
            color: '#F7DF1E',
            createdAt: new Date()
        },
        {
            id: '2',
            name: 'Python',
            icon: 'pi pi-code',
            color: '#F7DF1E',
            createdAt: new Date()
        },
        {
            id: '3',
            name: 'French',
            icon: 'pi pi-globe',
            color: '#F7DF1E',

            createdAt: new Date()
        },
        {
            id: '4',
            name: 'English',
            icon: 'pi pi-globe',
            color: '#F7DF1E',

            createdAt: new Date()
        }
    ]);
}
