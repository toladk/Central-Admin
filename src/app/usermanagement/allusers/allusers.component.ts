import { HomeService } from './../../home/services/home.service';
import { RolemanagementService } from './../../rolemanagement/service/rolemanagement.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { UsermanagementService} from './../services/usermanagement.service';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatAccordion} from '@angular/material/expansion';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.sass']
})
export class AllusersComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  loader = true;
   newresult = new Array();

  //Drawer
  visible = false;
  editUserVisible = false;
  permissionVisible = false;
  userDetailsVisible = false;

  // Pagination
  pagination: number = 1;

  // FILTERING
  sortingName: string;

  userForm: FormGroup;

  allUserList = [];
  allBranchList = [];
  userPermissionListId: any;
  error: string;
  submitted = false;
  userResult = [];
  userDetailList: any;
  userDetailList2 = [];

  // for Create and Edit Role
  userr: any;
  rolesList = [];
  userId: any;
  roleArr = [];
  allUserRole = [];

  // For Permission
  usernameResult = [];
  permissionList = [];
  count = 0;

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private usermanagementService: UsermanagementService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private homeService: HomeService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      userId: [''],
      employeeId: ['', Validators.required],
      roles: this.formBuilder.array([]),
    });

    this.getUsers();
    this.getBranches();
    this.getUserByUsername();
  }

  //For refresh Page
  refreshPage() {
    this._document.defaultView.location.reload();
  }

  // For Search
  SearchByName(){
    if(this.sortingName != ""){
    this.allUserList = this.allUserList.filter(res => {
      return res.username.toLocaleLowerCase().match(this.sortingName.toLocaleLowerCase());
    });
    }else if (this.sortingName == ""){
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
    this.getApprovedRoles();
    this.visible = true;
  }

  close(): void {
    this.visible = false;
    this.refreshPage()
  }

  closeViewUser(): void {
    this.editUserVisible = false;
    this.refreshPage()
  }

  closePermission(): void {
    this.permissionVisible = false;
  }

  closeUserDetails(): void {
    this.userDetailsVisible = false;
  }

  // Users
  createUser(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }else {
        this.userForm.value.roles = this.rolesList;
        delete this.userForm.value.userId;
        this.usermanagementService.createUser(this.userForm.value).subscribe((result: any) => {
        this.userResult = result;
        this.visible = false;
        this.clearForm();
        this.getUsers();
        if(result.isSuccessful === true){
          this.showNotification("snackbar-success", "User Created Succesfully !!!", "top", "Right");
        }else{
          this.showNotification("snackbar-danger", "Not a domain user", "top", "Right");
        }
      },error => {
        this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
      });
      // this.refreshPage()
      console.log(this.userForm.value);
    }
  }

  clearForm() {
    this.userForm.reset();
  }

  updateUse(userr){
    console.log('checking userr', this.newresult);
    this.userId = userr.id
    this.editUserVisible = true;
    this.usermanagementService.getUserById(userr.id).subscribe((result: any) => {
      this.userForm.patchValue({...result});
      this.usermanagementService.getApprovedRoles().subscribe((result: any) => {
        result.forEach(element => {
          element.isChecked = false;
          for(let i = 0; i < userr.roles.length; i++){
            if(userr.roles[i].id === element.id){
               element.isChecked = true;
               this.allUserRole.push(element);
            };
         };
        });
        this.groupRole(result);
      })
    })
  }
  updateUsersRoles(){
    this.userForm.value.userId = this.userId;
    this.userForm.value.roles = this.rolesList;
    delete this.userForm.value.employeeId;
    console.log('checking user', this.userForm.value);
    this.usermanagementService.updateUsersRoles(this.userForm.value).subscribe((result: any) => {
      this.userResult = result;
      this.editUserVisible = false;
      this.clearForm();
      this.refreshPage()
      this.getUsers();
      this.showNotification('snackbar-success', 'User Role Updated Succesfully !!!', 'top', 'Right');
      console.log(result);
    },error => {
      this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
    })
  }

  groupRole(responseData){
    const groups = this.groupBy(responseData, data => data.applicationName);
    for (const group of groups) {
      this.newresult.push(group);
    }
  }
 groupBy(list, keyGetter) {
  let result = new Array();
  const map = new Map();
  list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
          result.push(map.set(key, [item]));
         } else {
             collection.push(item);
         }
    });
    return map;
  }

  onChangeCreate(event, list) {
    if (event.source._checked) {
      list.map(item => {
        if ( event.value === item.id){
          item.isChecked = true;
          this.roleArr.push(item);
        }
      })
    }
    const tempArr: any[] = this.getUniqueListByAppName(this.roleArr, 'applicationName')
    this.rolesList = tempArr.map(item => {
      return {id: item.id}
    })
    console.log('checking role', this.rolesList);
  }

  onChangeEdit(event, list) {
    this.roleArr = [...this.allUserRole]
    if (event.source._checked) {
      list.map(item => {
        if ( event.value === item.id){
          item.isChecked = true;
          this.roleArr.push(item);
        }
      })
    }
    const tempArr: any[] = this.getUniqueListByAppName(this.roleArr, 'applicationName')
    this.rolesList = tempArr.map(item => {
      return {id: item.id}
    })
    console.log('checking role', tempArr);
  }

  getUniqueListByAppName(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
  }

  // Get All Users
  getUsers(){
    this.usermanagementService.getUsers().subscribe((result: any) => {
      this.allUserList = result
      this.loader = false;
    },error => {
      this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
    })
  }

  getUserByIdForPermission(id){
    this.userId = id;
    this.permissionVisible = true;
    this.usermanagementService.getUserById(id).subscribe((result: any) => {
      this.userPermissionListId = result.roles
      console.log(this.userPermissionListId);
    },error => {
      this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
    })
  }

  // Get All roles
  getApprovedRoles(){
    this.usermanagementService.getApprovedRoles().subscribe((result: any) => {
      result.forEach(element => {
        element.isChecked = false;
      });
      this.groupRole(result);
      this.loader = false;
    },error => {
      this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
    })
  }

  // Get All Branches
  getBranches(){
    this.usermanagementService.getBranches().subscribe((result: any) => {
      this.allBranchList = result.value;
      this.loader = false;
      // console.log(this.allBranchList);
    },error => {
      this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
    })
  }

  // Enable User
  enableUser(userId){
    this.usermanagementService.enableUser(userId).subscribe((result: any) => {
      this.userResult = result;
      this.getUsers();
      this.showNotification('snackbar-success','User Enabled Succesfully !!!','top','Right');
      console.log(result);
    },error => {
      this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
    })
  }

  // Disable User
  disableUser(userId){
    this.usermanagementService.disableUser(userId).subscribe((result: any) => {
      this.userResult = result;
      this.getUsers();
      this.showNotification('snackbar-success','User Disabled Succesfully !!!','top','Right');
      console.log(result);
    },error => {
      this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
    })
  }

  // View User Details
  viewUserDetails(id){
    this.userDetailsVisible = true;
    this.usermanagementService.getUserById(id).subscribe((result: any) => {
      this.userDetailList = result
      this.viewUserDetails2(id);
      console.log(this.userDetailList);
    },error => {
      this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
    })
  }
  viewUserDetails2(id){
    this.userDetailsVisible = true;
    this.usermanagementService.getUserById(id).subscribe((result: any) => {
      this.userDetailList2 = result.roles
      console.log(this.userDetailList2);
    },error => {
      this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
    })
  }

  clearUserRole(roleId){
    Swal.fire({
      title: 'Are you sure?',
      text: "User role will be deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4BA145',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete role!'
    }).then(result => {
      if (result.value) {
        this.permissionVisible = false;
        this.usermanagementService.clearUserRole(this.userId, roleId).subscribe((result: any) => {
          this.userResult = result;
          if(result.isSuccess === true){
            this.getUsers();
            this.showNotification('snackbar-success','User Role Deleted Succesfully !!!','top','Right');
          }
        },error => {
          this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
        })
      }
    });
  }

  // For Permission and User Details
  getUserByUsername(){
    let getUsername = localStorage.getItem('username');
    this.homeService.getUserByUsername(getUsername).subscribe((result: any) =>{
    this.usernameResult = result.roles;
    console.log("checking username", this.usernameResult)
    let centralAdminRole = this.usernameResult.find(x=>x.applicationName === "CENTRALADMINAPP");
    if(centralAdminRole === undefined){
      this.router.navigateByUrl('/authentication/login');
    }
    else{
      console.log('checking Application Name', centralAdminRole);
      centralAdminRole.permissions.forEach(permission => {
        this.permissionList.push(permission.name);
      });
      console.log("permissions",this.permissionList);
    }
    })
  }

  //download Users
  downloadUsers(){
    this.usermanagementService.exportAsExcelFile(this.allUserList, 'All Users');
  }


}
