import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HumanTaskComponent } from './human-task/human-task.component';
import { ProcessComponent } from './process/process.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { SolutionAreaComponent } from './solution-area/solution-area.component';
import { WorkflowsComponent } from './workflows/workflows.component';
import { WorkflowsExecutionComponent } from './workflows-execution/workflows-execution.component';
import { OrganizationComponent } from './organization/organization.component';
import { ContactComponent } from './contact/contact.component';
import { ChildOrganizationComponent } from './organization/child-organization/child-organization.component';
import { ProductComponent } from './product/product.component';
import { ProductTableListComponent } from './product-table-list/product-table-list.component';

const routes: Routes = [
  {
    path: 'humantask', component: HumanTaskComponent,
  },
  {
    path: 'process', component: ProcessComponent,
  },
  {
    path: 'schedulelist', component: ScheduleListComponent,
  },
  {
    path: 'solutionarea', component: SolutionAreaComponent,
  },
  {
    path: 'workflows', component: WorkflowsComponent,
  },
  {
    path: 'workflowsexecution', component: WorkflowsExecutionComponent,
  },
  {
    path: 'organization', component: OrganizationComponent,
  },
  {
    path: 'myorganization/organization', component: ChildOrganizationComponent,
  },
  {
    path: 'contact', component: ContactComponent,
  },
  {
    path: 'product', component: ProductComponent,
  },
  {
    path: 'product/product-list', component: ProductTableListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyOrganizationRoutingModule { }
