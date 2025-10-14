import { Component, signal } from '@angular/core';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
    filterParams = signal<any>({});
}
