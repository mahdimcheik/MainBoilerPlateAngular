import { Component, signal } from '@angular/core';
import { SmartCalendarComponent } from '../../../generic-components/smart-calendar/smart-calendar.component';
import { EventInput } from '@fullcalendar/core/index.js';

@Component({
    selector: 'app-calendar-teacher',
    imports: [SmartCalendarComponent],
    templateUrl: './calendar-teacher.component.html',
    styleUrl: './calendar-teacher.component.scss'
})
export class CalendarTeacherComponent {
    events = signal<EventInput[]>([
        {
            title: 'All Day Event',
            start: new Date(2025, 10, 10, 8, 0, 0),
            end: new Date(2025, 10, 10, 10, 0, 0)
        },
        {
            title: 'Long Event',
            start: new Date(2025, 10, 10, 12, 0, 0),
            end: new Date(2025, 10, 10, 14, 0, 0)
        }
    ]);

    canStartDrag = (selectInfo: any) => {
        return true;
    };

    canDrop = (dropInfo: any, draggedEvent: any) => {
        return true;
    };
}
