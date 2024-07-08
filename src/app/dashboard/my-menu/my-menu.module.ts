import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyMenuRoutingModule } from './my-menu-routing.module';
import { MyTaskComponent } from './my-task/my-task.component';
import { TeamTaskComponent } from './team-task/team-task.component';
import { TaskbarComponent } from './taskbar/taskbar.component';
import { IconsModule } from 'src/app/shared/icons/icons.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from 'src/app/shared/shared/shared.module';
// import { AgGridAngularComponent } from 'src/app/shared/shared/ag-grid-angular/ag-grid-angular.component';
// import { AgGridAngularComponent } from 'src/app/shared/ag-grid-angular/ag-grid-angular.component';

@NgModule({
  declarations: [
    MyTaskComponent,
    TeamTaskComponent,
    TaskbarComponent,

   
  ],
  imports: [
    CommonModule,
    MyMenuRoutingModule,
    IconsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    AgGridModule,
    SharedModule,
     
  ]
})
export class MyMenuModule { }
