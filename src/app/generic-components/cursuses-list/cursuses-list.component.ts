import { Component, model } from '@angular/core';
import { SmartSectionComponent } from '../smart-section/smart-section.component';
import { CursusComponent } from '../cursus/cursus.component';
import { Cursus, CursusResponseDTO } from '../../../api';

@Component({
    selector: 'app-cursuses-list',
    imports: [SmartSectionComponent, CursusComponent],

    templateUrl: './cursuses-list.component.html',
    styleUrl: './cursuses-list.component.scss'
})
export class CursusesListComponent {
    title = model('Listes des Coursus');
    editMode = model(true);
    buttonIcon = model('pi pi-plus');

    cursuses: CursusResponseDTO[] = [
        {
            id: '1',
            name: 'Angular 17',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus, sunt!',
            teacherId: 'teacher1',
            color: '#d64106ff',
            createdAt: new Date(),
            levelId: 'level1'
        },
        {
            id: '2',
            name: 'React 18',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus, sunt!',
            teacherId: 'teacher2',
            color: '#0b8a8aff',
            createdAt: new Date(),
            levelId: 'level2'
        }
    ];
}
