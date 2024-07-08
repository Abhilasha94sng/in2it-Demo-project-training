import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { MyorganizationServiceService } from '../myorganization-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {
  orgData! : any[]
  count!: number;
  viewForm: boolean = false;
  viewCard: boolean = false;
  checkboxData: any
  checkboxContact:any
  selectedContact: any
  editIndex!: number
  editMode: boolean = false
  showCard: boolean = false
  showTable: any

 
  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    // {
    //   field: "organization",
    //   checkboxSelection: true,

    // },
    {
      field: "organizationName",
      minWidth: 170,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      cellRenderer: (params: any) => {
        return `<a href="javascript:void(0);" class="name-link">${params.value}</a>`;
      }
    },
    { field: "name",
    cellRenderer: (params: any) => {
      return `<a href="javascript:void(0);" class="name-link">${params.value}</a>`;
    }
    },
    { field: "role" },
    { field: "email" },
    { field: "phone" }


  ];
  defaultColDef: ColDef = {
    flex: 1,
  };
    constructor( private organizationService: MyorganizationServiceService, private router: Router)
       { }
  id!:number
  jsonDta: any
    ngOnInit(): void {
      this.orgData = [];


      this.organizationService.orgData.forEach(org => {
        console.log(org);
        // this.id=+org.id;
        org.contact.forEach(contact => {
          const contactWithOrgName = {
            id:org.id,
            organizationName: org.organizationName,
            ...contact
          };
          

          this.orgData.push(contactWithOrgName);
        });
      });
      console.log(this.orgData)
}
onGridReady(params: any) {
  params.api.addEventListener('cellClicked', this.onCellClicked.bind(this));
}
onCellClicked(event: any) {
  console.log('Cell clicked event:', event);
  if (event.colDef.field === 'organizationName') {
    this.add(event.data, event.data.id);
  } 
}

add(data: any, id: any) {
  console.log('Adding:', data,id);
  this.router.navigate(['/myorganization/organization'], {
    state: { data, id }
  });
}

updateCount() {
  this.count = this.showTable.reduce((total: any, org: any) => {
    return (
      total + org.contact.filter((contact: any) => contact.selected).length
    );
  }, 0);
}

} 

