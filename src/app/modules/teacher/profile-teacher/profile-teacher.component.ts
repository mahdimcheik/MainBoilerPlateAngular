import { Component } from '@angular/core';
import { SmartSectionComponent } from '../../../generic-components/smart-section/smart-section.component';
import { ButtonModule } from 'primeng/button';
import { Image } from 'primeng/image';
import { FormationsListComponent } from '../../../generic-components/formations-list/formations-list.component';
import { FormationComponent } from '../../../generic-components/formation/formation.component';
import { AddressesListComponent } from '../../../generic-components/addresses-list/addresses-list.component';
import { PersonnalInfosComponent } from '../../../generic-components/personnal-infos/personnal-infos.component';

@Component({
    selector: 'app-profile-teacher',
    imports: [SmartSectionComponent, ButtonModule, Image, FormationsListComponent, AddressesListComponent, PersonnalInfosComponent],
    templateUrl: './profile-teacher.component.html',
    styleUrl: './profile-teacher.component.scss'
})
export class ProfileTeacherComponent {}
