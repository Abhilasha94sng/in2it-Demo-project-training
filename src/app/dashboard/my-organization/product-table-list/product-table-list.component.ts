import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { MyorganizationServiceService } from '../myorganization-service.service';
import { CustomProductCellComponent } from 'src/app/shared/shared/custom-product-cell/custom-product-cell.component';
import { ProductListTablenameInputComponent } from 'src/app/shared/shared/product-list-tablename-input/product-list-tablename-input.component';
import { ProductListTabledescriptionInputComponent } from 'src/app/shared/shared/product-list-tabledescription-input/product-list-tabledescription-input.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-table-list',
  templateUrl: './product-table-list.component.html',
  styleUrls: ['./product-table-list.component.css']
})
export class ProductTableListComponent implements OnInit {
  public gridOption! : GridOptions
  editingRowId!: any
  constructor(public orgService: MyorganizationServiceService, private router: Router) { }
  public colDefs: ColDef[] = [
    {
      field: 'table_id.value', headerName: 'Table ID',   
    },
    {
      field: 'table_name.value', headerName: 'Table Name',
      cellRenderer: ProductListTablenameInputComponent
    },
    { field: 'description.value', headerName: 'Table Description',
      cellRenderer: ProductListTabledescriptionInputComponent
     },

    { field: 'created_on.value', headerName: 'Created On' },
    { field: 'created_by.value', headerName: 'Created By' },
    { field: 'updated_on.value', headerName: 'Updated On' },
    { field: 'updated_by.value', headerName: 'Updated By' },
    { field: 'action', headerName: 'Action',
      cellRenderer: CustomProductCellComponent,
     },
  ];
  rowData!: any[]
  productList:any
  selectedData: any[] = [];
  showCard: boolean = false
  ngOnInit(): void { 
    this.orgService.getSelectedData().subscribe(
      (selectedData: any[]) => {
        this.selectedData = selectedData;
        this.renderGridData();
      },
      (error) => {
        console.error('Error fetching selected data:', error);
      }
    );

    this.orgService.getProducts().subscribe(
      (data: any) => {
        this.productList = data[0].data;
        if (this.productList) {
          let filteredData = this.productList.filter((item: any) => item.is_table_exist === true);          
          this.rowData = filteredData;
        } else {
          console.error('No data received');
        }
        this.renderGridData();
      },
      (error) => {
        console.error('Error fetching product data:', error);
      }
    );
    this.gridOption = {
      context: {
        parentComponent: this,
        parent: 'product-list-table'
      },
    }; 
  }
renderGridData() {
  if (this.rowData && this.selectedData) {
    this.rowData = [...this.rowData, ...this.selectedData];
    if (this.gridApi) {
      this.gridApi.setRowData(this.rowData);
    }
  }
}
gridApi: GridApi | undefined;

generateRandomId(): number {
  return Math.floor(Math.random() * 100); 
}
editingRowIds: any[] = [];
edit(rowId: any) {
  if (!this.editingRowIds.includes(rowId)) {
    this.editingRowIds.push(rowId);
  }
  this.updateAllRowsEditingState();
}

updateAllRowsEditingState() {
  this.rowData.forEach(row => {
    row.isEditing = this.editingRowIds.includes(row.table_id.value);
  });
  
  this.refreshGrid();
}

refreshGrid() {
  if (this.gridApi) {
    this.gridApi.setRowData(this.rowData);
  }
}
save(rowId: any) {
  this.editingRowIds = this.editingRowIds.filter(id => id !== rowId);
  this.updateAllRowsEditingState();
  this.gridOption.api?.refreshCells();
}
cancel(rowId: any){
 
  this.editingRowIds = this.editingRowIds.filter(id => id !== rowId);
  this.updateAllRowsEditingState();
  this.gridOption.api?.refreshCells();
}
delete(params: any): void {
  if (confirm('Are you sure you want to delete this data?')) {    
    const rowIndex = this.rowData.findIndex(row => row.table_id.value === params.table_id.value);    
    if (rowIndex > -1) {
      this.rowData.splice(rowIndex, 1);
      if (this.gridOption.api) {
        this.gridOption.api.setRowData(this.rowData);
      }
    }
  }
}
deleteAddedData(params:any){
  const rowIndex = this.rowData.findIndex(row => row.table_id.value === params.table_id.value);    
  if (rowIndex > -1) {
    this.rowData.splice(rowIndex, 1);
    if (this.gridOption.api) {
      this.gridOption.api.setRowData(this.rowData);
    }
  }
}

back(){
  this.router.navigate(['/myorganization/product']);
}
toggleCard() {
  this.showCard = !this.showCard;
}
addRow() {
  const newItem = {
    attribute_count: { value: 7, is_edit: false, type: 'integer' },
    created_by: { value: 'Gaurav Rautela', is_edit: false, type: 'many2one' },
    created_on: { value: '26/08/2023', is_edit: false, type: 'datetime' },
    description: { value: '', is_edit: true, type: 'char' },
    is_active: { value: true, is_edit: false, type: 'boolean' },
    is_standard: { value: true, is_edit: false, type: 'boolean' },
    is_table_exist: true,
    is_add: true,
    property: { is_edit: true, is_delete: true },
    related_table: [{}, {}], 
    rows_count: { value: 0, is_edit: false, type: 'integer' },
    table_id: { value: this.generateRandomId(), is_edit: false, type: 'integer' },
    table_name: { value: '', is_edit: true, type: 'char' },
    table_type: { value: 'is_standard', is_edit: false, type: 'boolean' },
    updated_by: { value: 'Gaurav Rautela', is_edit: false, type: 'many2one' },
    updated_on: { value: '26/08/2023', is_edit: false, type: 'datetime' }
  }
  this.rowData.push(newItem);
  console.log(this.rowData);
  
  
  if (this.gridOption.api) {
    this.gridOption.api.setRowData(this.rowData);
  }
  this.edit(newItem.table_id.value);
}
}
