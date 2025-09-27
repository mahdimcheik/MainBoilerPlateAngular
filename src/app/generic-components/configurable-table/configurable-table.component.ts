import { AfterViewInit, Component, ContentChild, ContentChildren, Input, input, model, QueryList, TemplateRef } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TableColumn } from '../../shared/models/TableColumn ';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-configurable-table',
    imports: [TableModule, NgTemplateOutlet, InputTextModule, CommonModule, FormsModule],
    templateUrl: './configurable-table.component.html',
    styleUrl: './configurable-table.component.scss'
})
export class ConfigurableTableComponent implements AfterViewInit {
    columns = input<TableColumn[]>([]);
    data = input<any[]>([]);
    rows = input<number>(10);
    globalFilter = input<boolean>(true);
    searchWord = model<string>('');

    @ContentChild('chipTemplate', { static: false }) chipTemplate!: TemplateRef<any>;

    findTemplate(name: string): TemplateRef<any> | null {
        return this.chipTemplate ?? null;
    }

    ngAfterViewInit(): void {}
}
