import { ApproverolesComponent } from './approveroles/approveroles.component';
import { AllrolesComponent } from './allroles/allroles.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'allroles',
    component: AllrolesComponent,
  },
  {
    path: 'approveroles',
    component: ApproverolesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleManagementRoutingModule {}
