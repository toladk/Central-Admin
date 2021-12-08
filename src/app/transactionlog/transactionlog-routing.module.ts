import { TransactionlogsComponent } from './transactionlogs/transactionlogs.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'transactionlogs',
    component: TransactionlogsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionLogRoutingModule {}
