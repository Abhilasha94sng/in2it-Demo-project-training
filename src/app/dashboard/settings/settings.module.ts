import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { CustomTaskComponent } from './custom-task/custom-task.component';
import { OrganizationSettingsComponent } from './organization-settings/organization-settings.component';


@NgModule({
  declarations: [
    CustomTaskComponent,
    OrganizationSettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
