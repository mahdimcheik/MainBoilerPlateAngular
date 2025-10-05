# Syncfusion Grid Column Definitions (ag-grid Style)

Yes, Syncfusion Grid supports defining columns in TypeScript just like ag-grid! Here's how:

## Basic Column Definition

Instead of using `<e-columns>` in the template, you can define columns in TypeScript:

```typescript
import { ColumnModel } from '@syncfusion/ej2-angular-grids';

export class MyGridComponent {
    public columns: ColumnModel[] = [
        {
            field: 'id',
            headerText: 'ID',
            width: 100,
            type: 'number',
            textAlign: 'Right'
        },
        {
            field: 'name',
            headerText: 'Name',
            width: 150,
            type: 'string'
        }
    ];
}
```

Then in template:
```html
<ejs-grid [dataSource]="data" [columns]="columns"></ejs-grid>
```

## Advanced Column Properties

```typescript
public columns: ColumnModel[] = [
    {
        field: 'orderID',
        headerText: 'Order ID',
        width: 120,
        type: 'number',
        
        // Basic properties
        textAlign: 'Right',
        isPrimaryKey: true,
        visible: true,
        
        // Feature controls
        allowFiltering: true,
        allowSorting: true,
        allowResizing: true,
        allowReordering: true,
        allowEditing: false,
        
        // Formatting
        format: 'N0',  // Number format
        clipMode: 'EllipsisWithTooltip',
        
        // Custom styling
        customAttributes: { class: 'my-column-class' },
        
        // Templates
        template: '<div style="color: blue;">${orderID}</div>',
        headerTemplate: '<div style="color: red;">📋 Order ID</div>',
        
        // Filter options
        filter: {
            type: 'Menu',
            params: {
                showSpinButton: false
            }
        },
        
        // Validation (for editable columns)
        validationRules: {
            required: true,
            minLength: 3
        }
    }
];
```

## Column Types

```typescript
// String column
{
    field: 'customerName',
    type: 'string',
    headerText: 'Customer'
}

// Number column with currency format
{
    field: 'amount',
    type: 'number',
    format: 'C2',  // Currency with 2 decimals
    textAlign: 'Right'
}

// Date column
{
    field: 'orderDate',
    type: 'date',
    format: { type: 'date', format: 'dd/MM/yyyy' }
}

// Boolean column as checkbox
{
    field: 'isActive',
    type: 'boolean',
    displayAsCheckBox: true
}
```

## Dynamic Column Operations (like ag-grid API)

```typescript
// Add column dynamically
addColumn(newColumn: ColumnModel): void {
    this.columns = [...this.columns, newColumn];
}

// Hide/Show column
toggleColumn(field: string): void {
    const grid = this.gridRef();
    if (grid) {
        const column = grid.getColumnByField(field);
        if (column?.visible) {
            grid.hideColumns(field);
        } else {
            grid.showColumns(field);
        }
    }
}

// Move column
moveColumn(from: string, to: string): void {
    const grid = this.gridRef();
    if (grid) {
        grid.reorderColumns(from, to);
    }
}

// Update column properties
updateColumn(field: string, updates: Partial<ColumnModel>): void {
    const columnIndex = this.columns.findIndex(col => col.field === field);
    if (columnIndex !== -1) {
        this.columns[columnIndex] = { ...this.columns[columnIndex], ...updates };
    }
}
```

## Custom Cell Renderers

```typescript
// Simple template
{
    field: 'status',
    template: '<span class="status-${status}">${status}</span>'
}

// Conditional formatting
{
    field: 'amount',
    template: '<div [style.color]="data.amount > 1000 ? \'red\' : \'green\'">${amount}</div>'
}

// Action buttons
{
    headerText: 'Actions',
    template: `
        <button (click)="edit(data)" class="btn btn-sm btn-primary">Edit</button>
        <button (click)="delete(data)" class="btn btn-sm btn-danger">Delete</button>
    `,
    allowFiltering: false,
    allowSorting: false
}
```

## Comparison with ag-grid

| Feature | ag-grid | Syncfusion |
|---------|---------|------------|
| Column Defs | `colDefs: ColDef[]` | `columns: ColumnModel[]` |
| Field Mapping | `field: 'name'` | `field: 'name'` |
| Header Text | `headerName: 'Name'` | `headerText: 'Name'` |
| Width | `width: 100` | `width: 100` |
| Cell Renderer | `cellRenderer: MyRenderer` | `template: '<div>...</div>'` |
| Hide Column | `columnApi.setColumnVisible()` | `grid.hideColumns()` |
| Move Column | `columnApi.moveColumn()` | `grid.reorderColumns()` |

## Key Advantages

1. **Type Safety**: Full TypeScript support with `ColumnModel` interface
2. **Dynamic Updates**: Easy to modify columns programmatically
3. **Reusability**: Column definitions can be shared across components
4. **Maintainability**: All column logic in one place
5. **Rich Features**: Extensive column properties for customization

## Best Practices

1. **Define column interfaces** for complex scenarios:
```typescript
interface GridColumn extends ColumnModel {
    isCustom?: boolean;
    businessLogic?: string;
}
```

2. **Use factory functions** for common column types:
```typescript
function createNumberColumn(field: string, headerText: string): ColumnModel {
    return {
        field,
        headerText,
        type: 'number',
        textAlign: 'Right',
        allowFiltering: true,
        allowSorting: true
    };
}
```

3. **Group related columns**:
```typescript
const customerColumns = [
    { field: 'customerName', headerText: 'Name' },
    { field: 'customerEmail', headerText: 'Email' }
];

const orderColumns = [
    { field: 'orderDate', headerText: 'Date', type: 'date' },
    { field: 'amount', headerText: 'Amount', type: 'number' }
];

this.columns = [...customerColumns, ...orderColumns];
```

This approach gives you the same flexibility and power as ag-grid's column definitions!
