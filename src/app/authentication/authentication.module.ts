import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SigninComponent } from './signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressButtonsModule } from 'mat-progress-buttons';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [
    SigninComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressButtonsModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class AuthenticationModule {}
