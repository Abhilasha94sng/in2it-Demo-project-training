
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
// import { MyorganizationServiceService } from 'src/app/dashboard/my-organization/myorganization-service.service';

@Component({
  selector: 'app-ag-grid-angular',
  templateUrl: './ag-grid-angular.component.html',
  styleUrls: ['./ag-grid-angular.component.css']
})
export class AgGridAngularComponent implements OnInit {
  orgData! : any[]
  public gridOptions!: GridOptions;
  public gridApi!: GridApi
  // showCard: boolean = false
  icons= [{name:'eye'}, {name:'eye-off'}]
  @Input() rowData: any[] = [];
  @Input() columnDefs: ColDef[] = [];
  @Output() cellClicked = new EventEmitter<any>();
  @Output() deleteRow = new EventEmitter<any>()
  @Input() gridOption!: GridOptions
  // @Output() toggleCard = new EventEmitter<void>();
  @Input() showCard: boolean = false;
  defaultColDef: ColDef = {
    flex: 1,
  };
  constructor( ) { }

  ngOnInit(): void {  
    

  }
  onGridReady(params: any) {
    this.gridApi = params.api;    
    this.gridApi.sizeColumnsToFit();
    params.api.addEventListener('cellClicked', this.onCellClicked.bind(this));
  }

  onCellClicked(event: any) {    
    this.cellClicked.emit(event);
  }
  deleteSelectedRow(): void {
    const selectedRows = this.gridApi.getSelectedRows();
    this.deleteRow.emit(selectedRows)
  }
  toggleCardVisibility(){
    this.showCard=!this.showCard
  }
  toggleColumn(column: ColDef) {
    column.hide = !column.hide; 
    this.gridApi?.setColumnDefs(this.columnDefs);
  }
  getIconName(column: ColDef): string {
    return column.hide ? 'eye-off' : 'eye'; 
  }
}
