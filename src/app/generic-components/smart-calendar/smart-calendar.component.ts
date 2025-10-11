import { Component, ViewChild, viewChild } from '@angular/core';
import { FilterSettingsModel, GridComponent, GridModule, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import {
    AgendaService,
    DayService,
    DragAndDropService,
    DragEventArgs,
    EventSettingsModel,
    MonthAgendaService,
    MonthService,
    ResizeEventArgs,
    ResizeService,
    ScheduleComponent,
    ScheduleModule,
    TimelineMonthService,
    TimelineViewsService,
    WeekService,
    WorkWeekService
} from '@syncfusion/ej2-angular-schedule';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';

@Component({
    selector: 'app-smart-calendar',
    imports: [ScheduleModule, ButtonModule, TimePickerModule],
    providers: [DayService, TimelineViewsService, TimelineMonthService, MonthService, AgendaService, DragAndDropService, MonthAgendaService, ResizeService, DayService, WeekService, WorkWeekService],
    templateUrl: './smart-calendar.component.html',
    styleUrl: './smart-calendar.component.scss'
})
export class SmartCalendarComponent {
    data: object[] = [];
    @ViewChild('scheduleObj')
    public scheduleObj?: ScheduleComponent;
    public selectedDate: Date = new Date(2018, 1, 15);
    public eventSettings: EventSettingsModel = {
        dataSource: this.data
    };
    onTreeDragStop(event: DragEventArgs): void {
        event.cancel = true;
        this.scheduleObj?.openEditor(event.data, 'Save');
    }
    onResizeStart(event: any): void {
        console.log(event);

        event.scroll = { enable: true, scrollBy: 15, timeDelay: 500 };
        this.scheduleObj?.openEditor(event.data, 'Save');
    }
    onResizeEnd(event: any): void {
        console.log(event);

        event.scroll = { enable: true, scrollBy: 15, timeDelay: 500 };
        this.scheduleObj?.openEditor(event.data, 'Save');
    }
}
