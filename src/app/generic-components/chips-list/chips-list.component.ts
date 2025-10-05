import { Component, model } from '@angular/core';
import { Chip } from 'primeng/chip';
import { LanguageResponseDTO } from '../../../api';

@Component({
    selector: 'app-chips-list',
    imports: [Chip],
    templateUrl: './chips-list.component.html',
    styleUrl: './chips-list.component.scss'
})
export class ChipsListComponent {
    chips = model<LanguageResponseDTO[]>([]);
}
