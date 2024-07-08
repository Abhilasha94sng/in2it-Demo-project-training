import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { WorkflowBuilderComponent } from './workflow-builder/workflow-builder.component';
import { ChartsComponent } from './charts/charts.component';

const routes: Routes = [
  {
    path: 'formbuilder', component: FormBuilderComponent
  },
  {
    path: 'workflowbuilder', component: WorkflowBuilderComponent
  },
  {
    path: 'charts', component: ChartsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignerRoutingModule { }
