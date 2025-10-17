import { Component, Input, Output, EventEmitter, input, model, computed } from '@angular/core';
import { ButtonModule } from 'primeng/button'; // Exemple avec PrimeNG
import { ICellRendererAngularComp } from '../../shared/models/TableColumn ';
import { Chip } from 'primeng/chip';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'app-options-renderer',
    standalone: true,
    imports: [Chip, TooltipModule],
    template: `
        <div class="flex gap-1">
            @if (displayValue(); as value) {
                <p-chip [label]="value.name" [style]="{ 'background-color': value?.color ?? '#000' }" [pTooltip]="value?.description ?? ''"> </p-chip>
            }
        </div>
    `
})
export class OptionsRendererComponent implements ICellRendererAngularComp {
    data = model<any>({});
    params = model<any>({});

    // Computed signal to extract and format the display value
    displayValue = computed(() => {
        const rowData = this.data();
        const cellParams = this.params();

        if (!rowData || !cellParams) {
            return null;
        }

        // Get the field name from params (should be passed via column definition)
        const field = cellParams.field;
        const options = cellParams.options || [];
        const optionValue = cellParams.optionValue || 'id';

        // Get the field value from the row
        const fieldValue = rowData[field];

        if (!fieldValue) {
            return null;
        }

        // If fieldValue is already an object with the display properties, return it
        if (typeof fieldValue === 'object' && fieldValue.name !== undefined) {
            return fieldValue;
        }

        // Otherwise, find the matching option from the options array
        const matchedOption = options.find((opt: any) => opt[optionValue] === fieldValue);
        return matchedOption || null;
    });

    ngOnInit(): void {
        console.log('OptionsRenderer - Row Data:', this.data());
        console.log('OptionsRenderer - Params:', this.params());
        console.log('OptionsRenderer - Display Value:', this.displayValue());
    }
}
