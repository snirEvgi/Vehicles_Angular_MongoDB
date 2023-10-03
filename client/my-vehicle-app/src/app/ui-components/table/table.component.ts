import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() headers: string[] = [];
  @Input() data: any[] = [];
  @Input() showActionsColumn: boolean = false; 
  @Output() deleteRowEvent = new EventEmitter<any>();


  deleteRow(id: string) {
    this.deleteRowEvent.emit(id);
  }
}
