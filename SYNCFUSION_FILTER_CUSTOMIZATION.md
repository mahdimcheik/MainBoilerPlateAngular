# Syncfusion Grid Filter Customization Guide

## How to Hide/Show Specific Filter Operators

Syncfusion Grid allows you to customize which filter operators are available for different column types. Here are several approaches:

## 1. Global Filter Operators (FilterSettings.operators)

Set custom operators for all columns of a specific type:

```typescript
this.filterSettings = {
    type: 'Menu',
    operators: {
        // String fields - only show "contains"
        stringOperator: [
            { value: 'contains', text: 'Contains' }
        ],
        
        // Number fields - custom operators
        numberOperator: [
            { value: 'equal', text: 'Equal' },
            { value: 'greaterthan', text: 'Greater Than' },
            { value: 'lessthan', text: 'Less Than' }
        ],
        
        // Date fields - before/after/equal
        dateOperator: [
            { value: 'equal', text: 'On Date' },
            { value: 'greaterthan', text: 'After' },
            { value: 'lessthan', text: 'Before' }
        ],
        
        // Boolean fields - only equal
        booleanOperator: [
            { value: 'equal', text: 'Equal' }
        ]
    }
};
```

## 2. Individual Column Filter Configuration

Set specific filter behavior for each column:

```typescript
public columns: ColumnModel[] = [
    {
        field: 'customerName',
        headerText: 'Customer Name',
        type: 'string',
        allowFiltering: true,
        // Only allow "contains" for this specific column
        filter: {
            type: 'Menu',
            operator: 'contains'  // Default operator
        }
    },
    {
        field: 'orderAmount',
        headerText: 'Order Amount',
        type: 'number',
        allowFiltering: true,
        // Default to "greater than" for amounts
        filter: {
            type: 'Menu',
            operator: 'greaterthan'
        }
    }
];
```

## 3. Dynamic Filter Operator Changes

Change filter operators at runtime:

```typescript
// Method to set all string fields to "contains" only
setStringFiltersToContainsOnly(): void {
    const gridInstance = this.grid();
    if (gridInstance) {
        gridInstance.filterSettings.operators = {
            stringOperator: [
                { value: 'contains', text: 'Contains' }
            ]
        };
        gridInstance.refresh();
    }
}

// Method to add more operators
addMoreStringOperators(): void {
    const gridInstance = this.grid();
    if (gridInstance) {
        gridInstance.filterSettings.operators.stringOperator = [
            { value: 'contains', text: 'Contains' },
            { value: 'startswith', text: 'Starts With' },
            { value: 'endswith', text: 'Ends With' }
        ];
        gridInstance.refresh();
    }
}
```

## 4. Available Filter Operators by Type

### String Operators:
```typescript
stringOperator: [
    { value: 'equal', text: 'Equal' },
    { value: 'notequal', text: 'Not Equal' },
    { value: 'contains', text: 'Contains' },
    { value: 'doesnotcontain', text: 'Does Not Contain' },
    { value: 'startswith', text: 'Starts With' },
    { value: 'endswith', text: 'Ends With' },
    { value: 'isnull', text: 'Is Null' },
    { value: 'isnotnull', text: 'Is Not Null' },
    { value: 'isempty', text: 'Is Empty' },
    { value: 'isnotempty', text: 'Is Not Empty' }
]
```

### Number Operators:
```typescript
numberOperator: [
    { value: 'equal', text: 'Equal' },
    { value: 'notequal', text: 'Not Equal' },
    { value: 'greaterthan', text: 'Greater Than' },
    { value: 'greaterthanorequal', text: 'Greater Than or Equal' },
    { value: 'lessthan', text: 'Less Than' },
    { value: 'lessthanorequal', text: 'Less Than or Equal' },
    { value: 'isnull', text: 'Is Null' },
    { value: 'isnotnull', text: 'Is Not Null' }
]
```

### Date Operators:
```typescript
dateOperator: [
    { value: 'equal', text: 'Equal' },
    { value: 'notequal', text: 'Not Equal' },
    { value: 'greaterthan', text: 'After' },
    { value: 'greaterthanorequal', text: 'On or After' },
    { value: 'lessthan', text: 'Before' },
    { value: 'lessthanorequal', text: 'On or Before' },
    { value: 'isnull', text: 'Is Null' },
    { value: 'isnotnull', text: 'Is Not Null' }
]
```

### Boolean Operators:
```typescript
booleanOperator: [
    { value: 'equal', text: 'Equal' },
    { value: 'notequal', text: 'Not Equal' },
    { value: 'isnull', text: 'Is Null' },
    { value: 'isnotnull', text: 'Is Not Null' }
]
```

## 5. Common Use Cases

### Show Only "Contains" for All Text Fields:
```typescript
this.filterSettings = {
    type: 'Menu',
    operators: {
        stringOperator: [
            { value: 'contains', text: 'Contains' }
        ]
    }
};
```

### Restrict Number Fields to Range Operations:
```typescript
this.filterSettings = {
    type: 'Menu',
    operators: {
        numberOperator: [
            { value: 'greaterthan', text: 'Greater Than' },
            { value: 'lessthan', text: 'Less Than' },
            { value: 'equal', text: 'Equal' }
        ]
    }
};
```

### Date Fields - Before/After Only:
```typescript
this.filterSettings = {
    type: 'Menu',
    operators: {
        dateOperator: [
            { value: 'greaterthan', text: 'After' },
            { value: 'lessthan', text: 'Before' }
        ]
    }
};
```

### Custom Operator Labels:
```typescript
this.filterSettings = {
    type: 'Menu',
    operators: {
        stringOperator: [
            { value: 'contains', text: 'Search' },
            { value: 'startswith', text: 'Begins With' },
            { value: 'equal', text: 'Exact Match' }
        ],
        numberOperator: [
            { value: 'greaterthan', text: 'More Than' },
            { value: 'lessthan', text: 'Less Than' },
            { value: 'equal', text: 'Exactly' }
        ]
    }
};
```

## 6. Advanced: Custom Filter UI

For completely custom filter behavior, you can create custom filter UI:

```typescript
{
    field: 'status',
    headerText: 'Status',
    allowFiltering: true,
    filter: {
        type: 'Menu',
        ui: {
            create: (args: any) => {
                // Create custom dropdown with predefined values
                const dropdown = new DropDownList({
                    dataSource: ['Active', 'Inactive', 'Pending'],
                    placeholder: 'Select Status'
                });
                dropdown.appendTo(args.target);
            },
            read: (args: any) => {
                // Return the selected value
                return args.target.value;
            },
            write: (args: any) => {
                // Set the filter value
                args.target.value = args.filteredValue || '';
            }
        }
    }
}
```

## 7. Best Practices

1. **Consistent UX**: Use similar operators for similar data types
2. **User-Friendly Labels**: Use clear, descriptive text for operators
3. **Context-Appropriate**: Choose operators that make sense for your data
4. **Performance**: Limit operators to reduce complexity
5. **Testing**: Test with actual user scenarios

## 8. Tips

- **Reset Filters**: Always provide a way to clear/reset filters
- **Default Operators**: Set sensible default operators for common use cases  
- **Documentation**: Document custom filter behavior for users
- **Validation**: Consider adding validation for filter values
- **Accessibility**: Ensure custom filters are accessible

This approach gives you fine-grained control over which filter operators are available, similar to how you would configure filters in ag-grid or other advanced data grids.
