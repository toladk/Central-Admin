import { AuthGuard } from './authentication/services/auth.guard';
import { AfterLoginService } from './authentication/services/after-login.service';
import { BeforeLoginService } from './authentication/services/before-login.service';
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '',
  component: AuthLayoutComponent,
  children: [
      { path: '', redirectTo: '/authentication/login', pathMatch: 'full' },

      // Extra components
      {
        path: 'extra-pages', canActivate : [AfterLoginService], loadChildren: () => import('./extra-pages/extra-pages.module').then((m) => m.ExtraPagesModule),
      },
      {
        path: 'home', canActivate : [AfterLoginService], loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'rolemanagement',  canActivate : [AfterLoginService], loadChildren: () => import('./rolemanagement/rolemanagement.module').then((m) => m.RoleManagementModule),
      },
      {
        path: 'usermanagement',  canActivate : [AfterLoginService], loadChildren: () => import('./usermanagement/usermanagement.module').then((m) => m.UserManagementModule),
      },
      {
        path: 'application',  canActivate : [AfterLoginService], loadChildren: () => import('./application/application.module').then((m) => m.ApplicationModule),
      },
      {
        path: 'branch',  canActivate : [AfterLoginService], loadChildren: () => import('./branch/branch.module').then((m) => m.BranchModule),
      },
      {
        path: 'auditlog',  canActivate : [AfterLoginService], loadChildren: () => import('./auditlog/auditlog.module').then((m) => m.AuditLogModule),
      },
      {
        path: 'transactionlog',  canActivate : [AfterLoginService], loadChildren: () => import('./transactionlog/transactionlog.module').then((m) => m.TransactionLogModule),
      },
      {
        path: 'approval',  canActivate : [AfterLoginService], loadChildren: () => import('./approval/approval.module').then((m) => m.ApprovalModule),
      },
    ],
  },
  {
    path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
