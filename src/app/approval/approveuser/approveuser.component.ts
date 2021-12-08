import { HomeService } from './../../home/services/home.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApprovalService, ApproveUser } from './../services/approval.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approveuser',
  templateUrl: './approveuser.component.html',
  styleUrls: ['./approveuser.component.sass']
})
export class ApproveuserComponent implements OnInit {
  loader = true;

  // Pagination
  pagination: number = 1;

  // FILTERING
  sortingName: string;

  allUnApproveUserList = [];
  error: string;
  approveResult: string;
  appro: ApproveUser = new ApproveUser( 0, '');

  // For Permission
  usernameResult = [];
  permList = [];
  permissionList = [];
  count = 0;

  constructor(
    private approvalService: ApprovalService,
    private snackBar: MatSnackBar,
    private homeService: HomeService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUnApprovedUsers();
    this.getUserByUsername();
  }

  // For Search
  SearchByName(){
    if(this.sortingName != ""){
    this.allUnApproveUserList = this.allUnApproveUserList.filter(res => {
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

  // Get All Unapproved Users
  getUnApprovedUsers(){
    this.approvalService.getUnApprovedUsers().subscribe((result: any) => {
      this.allUnApproveUserList = result;
      this.loader = false;
      // console.log(this.allUnApproveRoleList)
    },error => {
      this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
    })
  }

  // Aprrove User
  approveUser(appro){
    this.approvalService.approveUser(appro.id, appro.approverId).subscribe((result: any) => {
      this.approveResult = result;
      this.getUnApprovedUsers();
      // console.log(result);
      this.showNotification('snackbar-success','User Approved Succesfully !!!','top','Right');
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

}
