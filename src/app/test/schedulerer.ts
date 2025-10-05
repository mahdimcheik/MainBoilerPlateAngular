import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ResizeService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { MonthAgendaService } from '@syncfusion/ej2-angular-schedule';

import { Component, ViewChild } from '@angular/core';
import { data } from './data';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService, DragAndDropService, DragEventArgs, ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
@Component({
    imports: [ScheduleModule, TimePickerModule],

    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, DragAndDropService, ResizeService],
    standalone: true,
    selector: 'app-scheduler',
    // specifies the template string for the Schedule component
    template: `<ejs-schedule width="100%" #scheduleObj height="550px" [allowResizing]="true" [selectedDate]="selectedDate" [eventSettings]="eventSettings" (dragStop)="onTreeDragStop($event)"></ejs-schedule>`
})
export class SchedulererTestComponent {
    @ViewChild('scheduleObj')
    public scheduleObj?: ScheduleComponent;
    public selectedDate: Date = new Date(2018, 1, 15);
    public eventSettings: EventSettingsModel = {
        dataSource: data
    };
    onTreeDragStop(event: DragEventArgs): void {
        event.cancel = true; // cancels the drop action
        this.scheduleObj?.openEditor(event.data, 'Save'); // open the event window with updated start and end time
    }
}
