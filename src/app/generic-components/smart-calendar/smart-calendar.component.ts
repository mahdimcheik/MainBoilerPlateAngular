import { Component, ViewChild, signal, inject, computed, viewChild, model, output, input } from '@angular/core';

import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';
import { CheckboxModule } from 'primeng/checkbox';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule as PrimeButtonModule } from 'primeng/button';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarOptions, EventInput } from '@fullcalendar/core/index.js';
import { DateSelectArg, EventClickArg, EventContentArg, EventDropArg } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import frLocale from '@fullcalendar/core/locales/fr';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
    selector: 'app-smart-calendar',
    imports: [DialogModule, InputTextModule, TextareaModule, DatePickerModule, CheckboxModule, ReactiveFormsModule, CommonModule, PrimeButtonModule, TooltipModule, FullCalendarModule],
    providers: [],
    templateUrl: './smart-calendar.component.html',
    styleUrl: './smart-calendar.component.scss'
})
export class SmartCalendarComponent {
    private fb = inject(FormBuilder);
    calendarRef = viewChild(FullCalendarComponent);
    events = model<EventInput[]>([]);
    canDrop = input<(dropInfo: any, draggedEvent: any) => boolean>();
    canStartDrag = input<(selectInfo: any) => boolean>();
    initialView = computed(() => (window.innerWidth < 768 ? 'timeGridDay' : 'timeGridWeek'));

    // outputs
    onEventClickOutput = output();
    onResizeOutput = output<any>();
    onDateSelectOutput = output();
    onDragStartOutput = output();
    onDropOutput = output();

    onResize = (event: any) => {
        this.onResizeOutput.emit(event);
    };
    onDateSelect = (selectInfo: any) => {
        this.onDateSelectOutput.emit(selectInfo);
    };
    onEventClick = (clickInfo: any) => {
        this.onEventClickOutput.emit(clickInfo);
    };

    onDragStart = (dragInfo: any) => {
        this.onDragStartOutput.emit(dragInfo);
    };

    onDrop = (dropInfo: any) => {
        this.onDropOutput.emit(dropInfo);
    };

    // Method to get calendar API when needed
    getCalendarApi() {
        return this.calendarRef()?.getApi();
    }

    // condition to start drag
    //  canStartDrag = (selectInfo: any) => {
    //     console.log('Can start drag:', selectInfo);
    //     return true; // or some condition
    // };
    // canDrop = (dropInfo: any) => {
    //     console.log('Can drop:', dropInfo);
    //     return true; // or some condition
    // };

    calendarOptions = computed<CalendarOptions>(() => ({
        initialView: this.initialView(),
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        locale: frLocale,
        headerToolbar: {
            right: '',
            left: '',
            center: ''
        },
        views: {
            dayGridMonth: {
                titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' }
            },
            timeGridFiveDays: {
                type: 'timeGrid',
                duration: { days: 4 }
            },

            validRange: {
                start: '2024-05-24'
            }
        },
        weekends: true,
        slotDuration: '00:15:00',
        slotMinTime: '09:00',
        slotMaxTime: '22:00',
        allDaySlot: false,
        navLinks: true,
        eventStartEditable: true,
        eventOverlap: false,
        weekNumbers: true,
        selectMirror: true,
        unselectAuto: true,
        selectOverlap: false,
        editable: true,
        selectable: true,
        eventDurationEditable: true,
        defaultTimedEventDuration: '01:00:00',
        nowIndicator: true,
        allDayText: 'Heures',
        droppable: false,
        eventResizableFromStart: true,

        eventResizeStop() {},
        eventResize: this.onResize,
        // eventContent: this.renderEventContent, // template appoitment
        select: this.onDateSelect,
        eventClick: this.onEventClick,
        // drag and drop
        selectAllow: this.canStartDrag(), // can start drag event ?
        eventAllow: this.canDrop(), // can drop ?
        eventDrop: this.onDrop, // drop

        events: this.events(),
        eventColor: '#0000'
    }));
}
