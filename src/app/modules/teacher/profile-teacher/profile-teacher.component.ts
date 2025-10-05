import { Component } from '@angular/core';
import { SmartSectionComponent } from '../../../generic-components/smart-section/smart-section.component';
import { ButtonModule } from 'primeng/button';
import { Image } from 'primeng/image';

@Component({
    selector: 'app-profile-teacher',
    imports: [SmartSectionComponent, ButtonModule, Image],
    templateUrl: './profile-teacher.component.html',
    styleUrl: './profile-teacher.component.scss'
})
export class ProfileTeacherComponent {}
