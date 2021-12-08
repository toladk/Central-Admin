import { AuthenticationService } from './../services/authentication.service';
import { TokenService } from './../services/token.service';
import { JarwisService } from './../services/jarwis.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  fieldTextType: boolean;

  error = '';
  hide = true;
  submitted = false;

  loginForm: FormGroup;

  userName = [];

  constructor(
    private formBuilder: FormBuilder,
    private jarwis: JarwisService,
    private authentication: AuthenticationService,
    private token: TokenService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // for password visible or not
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  // Snack Bar
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 4000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName
    });
  }

  barButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Login',
    buttonColor: 'accent',
    barColor: 'primary',
    raised: true,
    stroked: false,
    mode: 'indeterminate',
    value: 0,
    disabled: false,
    fullWidth: true,
    buttonIcon: {
      fontIcon: 'keyboard_tab'
    }
  };

  onSubmit(){
    this.barButtonOptions.active = true;
    this.barButtonOptions.text = 'Login In Please Wait...';
    setTimeout(() => {
      this.barButtonOptions.active = false;
      this.barButtonOptions.text = 'Login';
    }, 5000);
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.error = 'Username and Password not valid !';
      return;
    }else {
      this.jarwis.login(this.loginForm.value).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error),
      );
    }
  }
  handleResponse(data){
    let username = this.loginForm.value.username;
    localStorage.setItem('username', this.loginForm.value.username);
    this.token.handle(data.value);
    console.log('checking the token', data.value);
    this.authentication.changeAuthStatus(true);
    this.router.navigateByUrl('home/dashboard');
    this.authentication.getUserByUsername(username).subscribe((result: any) =>{
    this.userName = result;
    // console.log("checking username", this.userName);
    })

  }
  handleError(error){
    // this.error = error.error.Error;
    error = this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
      // console.log(error);
  }

  sessionTimeOutMessage(){
    this.showNotification('snackbar-danger', 'Session Timeout - Please Login !!!', 'top', 'Right');
  }

}
