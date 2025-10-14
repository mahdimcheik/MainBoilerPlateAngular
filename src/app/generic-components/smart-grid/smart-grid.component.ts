import { CommonModule } from '@angular/common';
import { Component, model, OnInit, signal, Type } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TableModule } from 'primeng/table';
import { DynamicColDef, ICellRendererAngularComp } from '../../shared/models/TableColumn ';
import { ActionButtonRendererComponent } from './default-component';

@Component({
    selector: 'app-smart-grid',
    imports: [TableModule, TagModule, IconFieldModule, InputTextModule, InputIconModule, MultiSelectModule, SelectModule, CommonModule],

    templateUrl: './smart-grid.component.html',
    styleUrl: './smart-grid.component.scss'
})
export class SmartGridComponent<T> implements OnInit {
    componentMap = signal<{ [key: string]: Type<ICellRendererAngularComp> }>({
        default: ActionButtonRendererComponent
    });
    customComponents = model<{ [key: string]: Type<ICellRendererAngularComp> }>({});
    data = model<T[]>([]);
    loading = model(false);
    columns = model.required<DynamicColDef[]>();

    ngOnInit(): void {
        const temp = this.customComponents();
        temp['default'] = ActionButtonRendererComponent;
        this.componentMap.set(temp);
    }
    getComponent(templateName: string | Type<ICellRendererAngularComp>): Type<ICellRendererAngularComp> {
        if (typeof templateName === 'string') {
            return this.componentMap()[templateName];
        }
        return templateName;
    }
}
