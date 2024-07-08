import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { MyorganizationServiceService } from '../myorganization-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  icons =[{name: 'settings' },{name: 'plus-circle'}]
  isCollapsed = true;
  gridOption!: GridOptions
  getRowStyle:any;
  showCard: boolean = false;
  constructor( public orgService: MyorganizationServiceService, private router: Router ) {
    this.getRowStyle = (params: any) => {
      if (params.data.is_table_exist === true) {
        return { background: '#AEAEAE' }; 
      }
      return null;
    };
   }
  public colDefs: ColDef[] = [
    {
      field: 'table_name.value', headerName: 'Table Name',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      showDisabledCheckboxes: true
    },
    { field: 'description.value', headerName: 'Table Description', editable: params => !params.data.disabled  },
    { field: 'is_table_exist', headerName: 'Existing in product list',valueFormatter: params => params.value ? 'Yes' : 'No' }

  ];

  rowData!: any[]


  ngOnInit(): void {

    const storedData = localStorage.getItem('rowData');
    if (storedData) {
      this.rowData = JSON.parse(storedData);
    } else {
      this.orgService.getProducts().subscribe(
        (data) => {
          this.rowData = data[0].data;
        },
      );
    }  
    this.gridOption = {
      isRowSelectable: (params:any)=>{
        return (params.data.is_table_exist === false)
},
getRowStyle: this.getRowStyle,
context: {
  parentComponent: this,
  parent: 'product-table'
},
    }
}
generateRandomId(): number {
  return Math.floor(Math.random() * 100); // Adjust the range as needed
}
redirectTo(): void {
  if (this.gridOption && this.gridOption.api) {
    const selectedNodes = this.gridOption.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    console.log('Selected Data before modification:', selectedData);
    selectedData.forEach(row => {
      const id=this.generateRandomId()
      row.table_id = {value:id};
    });
    this.orgService.setSelectedData(selectedData);
    this.rowData = this.rowData.filter(row => !selectedData.find(selected => selected.table_id === row.table_id));
    this.gridOption.api.setRowData(this.rowData);
    this.router.navigate(['/myorganization/product/product-list']);
    

  }
}
toggleCard() {
  this.showCard = !this.showCard;
}
}
