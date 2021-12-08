import { ApproveuserComponent } from './approveuser/approveuser.component';
import { ApprovetellerComponent } from './approveteller/approveteller.component'
import { ApproveroleComponent } from './approverole/approverole.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'approveteller',
    component: ApprovetellerComponent,
  },
  {
    path: 'approverole',
    component: ApproveroleComponent,
  },
  {
    path: 'approveuser',
    component: ApproveuserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprovalRoutingModule {}
