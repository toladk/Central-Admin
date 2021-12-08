import { ApproveusersComponent } from './approveusers/approveusers.component';
import { AllusersComponent } from './allusers/allusers.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'allusers',
    component: AllusersComponent,
  },
  {
    path: 'approveusers',
    component: ApproveusersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule {}
