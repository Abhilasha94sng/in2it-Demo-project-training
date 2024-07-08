import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomTaskComponent } from './custom-task/custom-task.component';
import { OrganizationSettingsComponent } from './organization-settings/organization-settings.component';

const routes: Routes = [
  {
    path: 'customtask', component: CustomTaskComponent
  },
  {
    path: 'organizationsettings', component: OrganizationSettingsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
