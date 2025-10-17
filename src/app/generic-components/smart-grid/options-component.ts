import { Component, Input, Output, EventEmitter, input, model } from '@angular/core';
import { ButtonModule } from 'primeng/button'; // Exemple avec PrimeNG
import { ICellRendererAngularComp } from '../../shared/models/TableColumn ';
import { Chip } from 'primeng/chip';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'app-options-renderer',
    standalone: true,
    imports: [Chip, TooltipModule],
    template: `
        <div>
            @for (option of data(); track option.id) {
                <p-chip [label]="option.name" [style]="{ 'background-color': option?.color ?? '#000' }" ptooltip="option?.description ?? ''"> </p-chip>
            }
        </div>
    `
})
export class OptionsRendererComponent implements ICellRendererAngularComp {
    data = model<any[]>([]);
    params = model<any>({});

    ngOnInit(): void {
        console.log(this.data());
        console.log(this.params());
    }
}
