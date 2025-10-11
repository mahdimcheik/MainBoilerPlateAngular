import { Component, inject, model } from '@angular/core';
import { SmartSectionComponent } from '../smart-section/smart-section.component';
import { Formation, FormationResponseDTO } from '../../../api';
import { FormationComponent } from '../formation/formation.component';

@Component({
    selector: 'app-formations-list',
    imports: [SmartSectionComponent, FormationComponent],
    templateUrl: './formations-list.component.html',
    styleUrl: './formations-list.component.scss'
})
export class FormationsListComponent {
    title = model('Listes des formations');
    editMode = model(true);
    buttonIcon = model('pi pi-plus');

    formations: FormationResponseDTO[] = [
        {
            id: '1',
            title: 'Formation Angular',
            description: "Apprenez les bases d'Angular",
            institution: 'OpenAI Academy',
            dateFrom: new Date('2023-01-01'),
            dateTo: new Date('2023-06-01'),
            // updatedAt: new Date(),
            createdAt: new Date(),
            userId: 'user1'
        },
        {
            id: '2',
            title: 'Formation Angular',
            description: "Apprenez les bases d'Angular",
            institution: 'OpenAI Academy',
            dateFrom: new Date('2023-01-01'),
            dateTo: new Date('2023-06-01'),
            // updatedAt: new Date(),
            createdAt: new Date(),
            userId: 'user1'
        },
        {
            id: '3',
            title: 'Formation React',
            description: 'Apprenez les bases de React',
            institution: 'OpenAI Academy',
            dateFrom: new Date('2023-02-01'),
            dateTo: new Date('2023-07-01'),
            // updatedAt: new Date(),
            createdAt: new Date(),
            userId: 'user2'
        }
    ];
}
