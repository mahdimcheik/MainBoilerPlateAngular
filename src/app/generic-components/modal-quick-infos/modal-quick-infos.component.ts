import { Component, computed, model } from '@angular/core';
import { EventInput } from '@fullcalendar/core/index.js';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Slot } from '../../../api';

@Component({
    selector: 'app-modal-quick-infos',
    imports: [DialogModule, ButtonModule],
    templateUrl: './modal-quick-infos.component.html',
    styleUrl: './modal-quick-infos.component.scss'
})
export class ModalQuickInfosComponent {
    visible = model(false);
    event = model.required<EventInput>();
    slot = computed<Slot | null>(() => {
        if (this.event().extendedProps && this.event().extendedProps?.['slot']) {
            return this.event().extendedProps?.['slot'];
        }
        return null;
    });
    title = computed(() => (this.slot() ? `Détails du créneau - ${this.slot()?.dateTo}` : "Détails de l'événement"));

    close() {
        this.visible.set(false);
    }
}
