import { HomeService } from './../../home/services/home.service';
import { RolemanagementService, CreateRole } from './../service/rolemanagement.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allroles',
  templateUrl: './allroles.component.html',
  styleUrls: ['./allroles.component.sass']
})
export class AllrolesComponent implements OnInit {
  loader = true;

  //Drawer
  visible = false;
  visible2 = false;
  visible3 = false;

  // Pagination
  pagination: number = 1;

  // FILTERING
  sortingName: string;

  roleForm: FormGroup;

  allRoleList = [];
  allRoleListId = [];
  allApplicationList = [];
  applicationPermission = [];

  error: string;
  submitted = false;
  roleResult = [];
  roleByIdList = [];

  // for Create and Edit Role
  rolle: any;
  permissionsList = [];

  // For Permission
  usernameResult = [];
  permList = [];
  permissionList = [];
  count = 0;

  constructor(
    private roleManagementService: RolemanagementService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private homeService: HomeService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.roleForm = this.formBuilder.group({
      id: [''],
      roleName: ['', [Validators.required, this.noWhitespaceValidator]],
      applicationId: ['', Validators.required],
      permissions: this.formBuilder.array([]),
      isTeller: [false],
    });
    this.getApprovedRoles();
    this.getAllApplications();
    this.getUserByUsername();
  }

  noWhitespaceValidator(control: FormControl) {
    const isSpace = (control.value || '').match(/\s/g);
    return isSpace ? {'whitespace': true} : null;
  }

  // For Search
  SearchByName(){
    if(this.sortingName !== ""){
    this.allRoleList = this.allRoleList.filter(res => {
      return res.roleName.toLocaleLowerCase().match(this.sortingName.toLocaleLowerCase());
    });
    }else if (this.sortingName === ""){
      this.ngOnInit();
    }
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

  // Sorting
  key: string = 'id';
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  openEdit(): void {
    this.visible2 = true;
  }

  closeEdit(): void {
    this.visible2 = false;
  }

  closeEditViewPerm(): void {
    this.visible3 = false;
  }

  // Clear Form
  clearForm(){
    this.roleForm.reset();
  }

  createRole(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.roleForm.invalid) {
      return;
    }else {
        this.roleForm.value.permissions = this.permissionsList;
        delete this.roleForm.value.id;
        this.roleManagementService.createRole(this.roleForm.value).subscribe((result: any) => {
        this.roleResult = result;
        if(result.isSuccess === true){
          this.clearForm();
          this.visible = false;
          this.getApprovedRoles();
          this.showNotification('snackbar-success','Role Created Succesfully !!!','top','Right');
        }
      },error => {
        this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
      });
      console.log(this.roleForm.value);
    }
  }

  updatePerm(rolle){
    this.visible2 = true;
    let appName = '';
    this.roleManagementService.getRoleById(rolle.id).subscribe((result: any) => {
      this.roleForm.patchValue({...result});
      const appDto = result.applicationDto;
      appName = appDto.applicationName;
      console.log('app name oo', appName);
      this.roleManagementService.getAllPermissionsByApplicationName(appName).subscribe((result: any) => {
        result.forEach(element => {
          element.isChecked = false;
          for(let i = 0; i < rolle.permissions.length; i++){
            if(rolle.permissions[i].id === element.id){
               element.isChecked = true;
               console.log('checking perm', element);
            };
         };
        });
        this.applicationPermission = result;
        console.log(result);
      })
    })
  }
  updatePermission(){
    this.roleForm.value.permissions = this.permissionsList;
    delete this.roleForm.value.applicationId;
    console.log('checking permission', this.roleForm.value);
    this.roleManagementService.manageRole(this.roleForm.value).subscribe((result: any) => {
      this.roleResult = result;
      if(result.isSuccess === true){
        this.clearForm();
        this.visible2 = false;
        this.getApprovedRoles();
        this.showNotification('snackbar-success','Permission Updated Succesfully !!!','top','Right');
      }
    },error => {
      this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
    });
    console.log(this.roleForm.value);
  }

  // Get all Application
  getAllApplications(){
    this.roleManagementService.getAllApplications().subscribe((result: any) => {
      this.allApplicationList = result;
      // console.log(result);
    },error => {
      this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
    })
  }

  // Fetch Application Permission
  getApplicationNamePermissions(name){
    this.roleManagementService.getAllPermissionsByApplicationName(name.applicationName).subscribe((result: any) => {
      result.forEach(element => {
        element.isChecked = false;
      });
      this.applicationPermission = result;
      console.log(result);
    },error => {
      this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
    })
  }

  onChange(obj, isChecked: boolean) {
    if (isChecked) {
      this.applicationPermission.map(item => {
        if ( obj.id === item.id){
          item.isChecked = true;
        }
      })
    } else {
      this.applicationPermission.map(item => {
        if ( obj.id === item.id){
          item.isChecked = false;
        }
      })
    }
    this.permissionsList = this.applicationPermission.filter(item => item.isChecked)
  }

  // Get All roles
  getApprovedRoles(){
    this.roleManagementService.getApprovedRoles().subscribe((result: any) => {
      this.allRoleList = result;
      this.loader = false;
      // console.log(this.allRoleList)
    },error => {
      this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
    })
  }

  getRoleById(id){
    this.visible3 = true;
    this.roleManagementService.getRoleById(id).subscribe((result: any) => {
      this.roleByIdList = result.permissions;
      console.log(this.roleByIdList);
    },error => {
      this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
    })
  }

  // For Permission and User Details
  getUserByUsername(){
    let getUsername = localStorage.getItem('username');
    this.homeService.getUserByUsername(getUsername).subscribe((result: any) =>{
    this.usernameResult = result.roles;
    console.log("checking username", this.usernameResult)
    let centralAdminRole = this.usernameResult.find(x => x.applicationName === "CENTRALADMINAPP");
    if (centralAdminRole === undefined){
        this.router.navigateByUrl('/authentication/login');
      }
      else{
        console.log('checking Application Name', centralAdminRole);
        centralAdminRole.permissions.forEach(permission => {
          this.permissionList.push(permission.name);
        });
        console.log("permissions", this.permissionList);
      }
    })
  }

}
