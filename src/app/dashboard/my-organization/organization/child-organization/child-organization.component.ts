import { Component, Input, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { MyorganizationServiceService } from '../../myorganization-service.service';
import { CustomCellComponent } from 'src/app/shared/shared/custom-cell/custom-cell.component';


@Component({
  selector: 'app-child-organization',
  templateUrl: './child-organization.component.html',
  styleUrls: ['./child-organization.component.css']
})
export class ChildOrganizationComponent implements OnInit {
  addedOrgDetails: any = []
  orgId!: string;
  rowData! : any[]
  // isActive: boolean = true
  active = 1;
  isActive: string = 'generalOverview'; // Initialize to the first tab
  showCard: boolean = false;
  selectedContact:any
  showDiv(tab: string) {
    this.isActive = tab;
  }
  @Input() organization!: any;
  gridOption!: GridOptions
  public orgData: any[] = [];
  public colDefs: ColDef[] = [
    { field: 'name',
      // cellRenderer: (params: any) => {
      //   return `<a href="javascript:void(0);" class="name-link">${params.value}</a>`;
      // }
      cellRenderer: CustomCellComponent
     },
    { field: 'role' },
    { field: 'email' },
    { field: 'phone' }
  ];
  constructor(public orgService: MyorganizationServiceService,) { }

  ngOnInit(): void {  
    this.rowData = [];
    this.orgService.orgData.forEach(org => {
      org.contact.forEach(contact => {
        if(this.organization.organizationName===org.organizationName){
          this.rowData.push(contact);
        }     
      });
    });
    this.gridOption={
     context: {
      parentComponent: this,
      parent: 'child'
     }
    }

}


  toggleCard(contact:any) {
    
    this.selectedContact = contact
    this.showCard = !this.showCard;
}
openCard(contact:any){
  this.selectedContact = contact
  this.showCard = true

}

close(){
  this.showCard = false
}

onCellClicked(event: any) {
  console.log(event);  
  if (event.colDef.field === 'name') {
    this.openCard(event.data)
  }
}

}
