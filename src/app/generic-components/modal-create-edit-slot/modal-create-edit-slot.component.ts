import { Component, computed, inject, linkedSignal, model, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ConfigurableFormComponent } from '../configurable-form/configurable-form.component';
import { DrawerModule } from 'primeng/drawer';
import { EventInput } from '@fullcalendar/core/index.js';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Structure } from '../configurable-form/related-models';
import { SlotResponseDTO } from '../../../api';

@Component({
    selector: 'app-modal-create-edit-slot',
    imports: [DialogModule, ConfigurableFormComponent, DrawerModule],
    templateUrl: './modal-create-edit-slot.component.html',
    styleUrl: './modal-create-edit-slot.component.scss'
})
export class ModalCreateEditSlotComponent implements OnInit {
    fb = inject(FormBuilder);

    event = model<EventInput | null>(null);
    visible = model(false);
    title = computed(() => (this.event() ? "Modification d'un créneau" : "Création d'un créneau"));
    slot = linkedSignal<SlotResponseDTO | null>(() => {
        const slot = this.event()?.extendedProps?.['slot'];
        if (slot) {
            return slot;
        }
        return null;
    });
    start = computed(() => this.event()?.start as Date);
    end = computed(() => this.event()?.end as Date);

    form = computed<Structure>(() => {
        return {
            id: 'slot',
            name: 'Créneau',
            label: 'Créneau',
            formFieldGroups: [
                {
                    id: 'informations',
                    name: 'Informations',
                    label: 'Informations',
                    fields: [
                        { id: 'start', label: 'Date de début', name: 'start', type: 'date', value: this.start() ?? null, timeOnly: true, fullWidth: true },
                        { id: 'end', label: 'Date de fin', name: 'end', type: 'date', value: this.end() ?? null, timeOnly: true, required: true, fullWidth: true },
                        { id: 'typeId', label: 'Type', name: 'typeId', type: 'select', options: this.getTypes(), required: true, compareKey: 'id', displayKey: 'name', value: this.slot()?.typeId ?? null, fullWidth: true }
                    ]
                }
            ]
        };
    });

    ngOnInit(): void {
        console.log(this.event());
    }

    getTypes() {
        return [
            { id: '1', name: 'Type 1' },
            { id: '2', name: 'Type 2' },
            { id: '3', name: 'Type 3' }
        ];
    }

    submit(event: FormGroup) {
        console.log(event.value);
    }

    cancel() {
        this.visible.set(false);
    }
}
