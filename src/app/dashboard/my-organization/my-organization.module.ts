import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyOrganizationRoutingModule } from './my-organization-routing.module';
import { SolutionAreaComponent } from './solution-area/solution-area.component';
import { ProcessComponent } from './process/process.component';
import { WorkflowsComponent } from './workflows/workflows.component';
import { HumanTaskComponent } from './human-task/human-task.component';
import { WorkflowsExecutionComponent } from './workflows-execution/workflows-execution.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { OrganizationComponent } from './organization/organization.component';
import { ContactComponent } from './contact/contact.component';
import { ChildOrganizationComponent } from './organization/child-organization/child-organization.component';
import { IconsModule } from 'src/app/shared/icons/icons.module';
import { NgbCollapseModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ProductComponent } from './product/product.component';
import { ProductTableListComponent } from './product-table-list/product-table-list.component';
import { HttpClientModule } from '@angular/common/http';
// import { SharedModule } from 'src/app/shared/shared/shared.module';
// import { SharedModule } from 'src/app/shared/shared/shared.module';
// import { AgGridAngularComponent } from 'src/app/shared/shared/ag-grid-angular/ag-grid-angular.component';



@NgModule({
  declarations: [
    SolutionAreaComponent,
    ProcessComponent,
    WorkflowsComponent,
    HumanTaskComponent,
    WorkflowsExecutionComponent,
    ScheduleListComponent,
    OrganizationComponent,
    ContactComponent,
    ChildOrganizationComponent,
    ProductComponent,
    ProductTableListComponent,

  ],
  imports: [
    CommonModule,
    MyOrganizationRoutingModule,
    IconsModule,
    NgbModule,
    NgbNavModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    AgGridModule,
   SharedModule,
   HttpClientModule ,
   NgbCollapseModule
  ]
  })
export class MyOrganizationModule { }
