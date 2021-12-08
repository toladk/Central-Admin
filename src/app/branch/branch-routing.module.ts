import { BranchesComponent } from './branches/branches.component';
import { TellersComponent } from './tellers/tellers.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'tellers',
    component: TellersComponent,
  },
  {
    path: 'branches',
    component: BranchesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BranchRoutingModule {}
