import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MyorganizationServiceService } from '../myorganization-service.service';
import { ColDef, GridOptions } from 'ag-grid-community';
import { CustomCellComponent } from 'src/app/shared/shared/custom-cell/custom-cell.component';



@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  trackById: any;
  showTable!: any;
  organizationType: string = 'All';
  
  
  @Output() selectedTabData = new EventEmitter<any>();
  flag!: boolean;
  datasource:any;
  rowData!: any[];
  gridOption!:GridOptions
  public orgData: any[] = [];
  navs = [
    {
      id: 0,
      organizationName: 'Organization',
      type: '',
      industry: '',
      onboarding: '',
      relatedOrgs: '',
      products: '',
      email: '',
      phone: '',
      registrationNo: '',
      description: '',
      tier: '',
      spoc: '',
      mobileno: '',
    },
  ];
  counter = this.navs.length + 1;
  active!: number;
  public colDefs: ColDef[] = [
    {
      field: 'organizationName',
      minWidth: 170,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      // cellRenderer: (params: any) => {
      //   return `<a href="javascript:void(0);" class="name-link">${params.value}</a>`,
       
      // },
      cellRenderer:  CustomCellComponent,
    },
    {
      field: 'type'
    },
    { field: 'industry' },
    { field: 'onboarding' },
    { field: 'relatedOrgs'},
    { field: 'products' },


    { field: 'email' },
    { field: 'phone' },
  ];
  constructor(private orgService:MyorganizationServiceService) {}

  ngOnInit(): void {   
    this.gridOption={
      context: {
        parentComponent: this,
        parent: 'organization'
      }
    }

    this.rowData = [];
    this.orgService.orgData.forEach((org) => {
      this.rowData.push(org);
    });
    this.getAllTable();
    // const navigation = history.state;
    // if (navigation && navigation.data && navigation.id) {
    //   this.datasource = navigation.data;
    //   console.log(navigation.data);
      
 
    //  this.add(navigation.data)
    // }
  }


  close(event: MouseEvent, toRemove: number) {
    this.navs.splice(toRemove, 1);
    this.active=0
    event.preventDefault();
    event.stopImmediatePropagation();
  }


  checkExisitingTab(id: number) {
    this.flag = false;
    this.navs.some((data) => {
      if (data.id === id) {
        this.flag = true;
        return true;
      }
      return false;
    });
  }


  add( org: any) {
    this.checkExisitingTab(org.id);
   this.active=org.id
    if(!this.flag){
      this.navs.push(org);
      // event.preventDefault();
    }
  }
  getAllTable() {
    this.rowData = this.orgService.orgData;
    console.log("this.showTable", this.rowData);
    
  }
 
  filterOrgData(filter: any) {
    this.organizationType = filter;
    if (filter === 'All') {
      this.rowData = this.orgService.orgData;
    } else {
      this.rowData = this.orgService.orgData.filter((data) => data.type === filter);
      
    }
  }

  onCellClicked(event: any) {
    if (event.colDef.field === 'organizationName') {
      const org = {
        id: event.data.id,
        organizationName: event.data.organizationName, 
      };
      this.add(org);
    }
  }
}
