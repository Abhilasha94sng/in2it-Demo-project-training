import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo:'mymenu', pathMatch:'full'},
  { 
    path: 'mymenu', 
    loadChildren: () => import('./dashboard/my-menu/my-menu.module').then(m => m.MyMenuModule) 
  },
  { 
    path: 'myorganization', 
    loadChildren: () => import('./dashboard/my-organization/my-organization.module').then(m => m.MyOrganizationModule) 
  },
  { 
    path: 'designer', 
    loadChildren: () => import('./dashboard/designer/designer.module').then(m => m.DesignerModule) 
  },
  { 
    path: 'settings', 
    loadChildren: () => import('./dashboard/settings/settings.module').then(m => m.SettingsModule) 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
