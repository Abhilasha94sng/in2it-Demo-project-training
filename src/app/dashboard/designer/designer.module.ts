import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignerRoutingModule } from './designer-routing.module';
import { WorkflowBuilderComponent } from './workflow-builder/workflow-builder.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { ChartsComponent } from './charts/charts.component';
import { IconsModule } from 'src/app/shared/icons/icons.module';


@NgModule({
  declarations: [
    WorkflowBuilderComponent,
    FormBuilderComponent,
    ChartsComponent
  ],
  imports: [
    CommonModule,
    DesignerRoutingModule,
    IconsModule
  ]
})
export class DesignerModule { }
