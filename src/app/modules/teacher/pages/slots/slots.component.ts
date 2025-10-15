import { Component, effect, inject, signal, Type } from '@angular/core';
import { ActionButtonRendererComponent, CustomTableState, DynamicColDef, ICellRendererAngularComp, INITIAL_STATE, SmartGridComponent } from '../../../../generic-components/smart-grid';
import { SlotResponseDTO, TypeSlotResponseDTO } from '../../../../../api/models';
import { SlotMainService } from '../../../../shared/services/slot-main.service';
import { UserMainService } from '../../../../shared/services/userMain.service';

@Component({
    selector: 'app-slots',
    imports: [SmartGridComponent],
    templateUrl: './slots.component.html',
    styleUrl: './slots.component.scss'
})
export class SlotsComponent {
    slotservice = inject(SlotMainService);
    userService = inject(UserMainService);
    slots = this.slotservice.slots;
    totalRecords = this.slotservice.totalRecords;
    typeSlot = this.slotservice.TypeSlot;

    loading = signal(false);
    filterParams = signal<CustomTableState>(INITIAL_STATE);
    customComponents = signal<{ [key: string]: Type<ICellRendererAngularComp> }>({
        default: ActionButtonRendererComponent
    });

    columns = signal<DynamicColDef[]>([
        {
            field: 'dateFrom',
            header: 'Date From',
            type: 'date',
            filterable: true,
            sortable: true
        },
        {
            field: 'dateTo',
            header: 'Date To',
            type: 'date',
            filterable: true,
            sortable: true
        },
        {
            field: 'type',
            header: 'Type',
            type: 'array',
            valueFormatter: (type) => (type as TypeSlotResponseDTO)?.name,
            options: this.typeSlot(),
            optionLabel: 'name',
            optionValue: 'id',
            filterable: true,
            filterField: 'levelId'
        }
    ]);

    constructor() {
        this.slotservice.getAllTypeSlot();
        effect(() => {
            const params = this.filterParams();
            this.slotservice.getAllSlotsByUserPaginated(this.userService.userConnected().id, params);
        });
    }
}
