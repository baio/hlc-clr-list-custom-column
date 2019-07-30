import { Component } from '@angular/core';
import { Table } from '@ng-holistic/clr-list';
import { Subject, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

// Provide table UI definition in js object
const definition: Table.Definition = {
    cols: [
        {
            id: 'title',            
            title: 'Title',
            // for this cell you must provide template with hlcClrCustomCell="title"
            customCell: true,
            sort: true
        },
        {
            id: 'amount',
            title: 'Amount',
            // for this cell you must provide template with hlcClrCustomCell="amount"
            customCell: true,
            sort: false
        }
    ]
};

// Provide data for the table
const rows: Table.Row[] = [
    {
        id: '1',
        title: 'one',
        amount: 2
    },
    {
        id: '2',
        title: 'two',
        amount: 3
    }
];

const dataProvider: Table.Data.DataProvider = {
    load(_) {
        return timer(0).pipe(mapTo({ rows }));
    }
};

@Component({
  selector: 'my-table',
  template: `<hlc-clr-table [definition]="definition" [dataProvider]="dataProvider">
    <!-- use hlcClrCustomCell to render any component inside custom cell template -->
    <!-- use let-val for binding to the current cell value -->
    <!-- use let-row for binding to the current row -->
    <ng-template hlcClrCustomCell="title" let-val> <small>{{val}}</small>  </ng-template>
    <ng-template hlcClrCustomCell="amount" let-val let-row="row"> {{ row['title'] }} : {{val}}  </ng-template>
  </hlc-clr-table>`
})
export class TableComponent  {
  definition = definition;
  dataProvider = dataProvider;
}
