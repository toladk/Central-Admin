import { HomeService } from './../services/home.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  allUnApproveRoleList = [];
  allUnApproveUserList = [];
  allUnApproveTellerList = [];
  allRoleList = [];
  allUserList = [];
  allBranchList = [];
  allApplicationList = [];
  allApprovedRoleList = [];

  constructor(
    private homeService: HomeService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
   }

  ngOnInit(): void {
    this.getUnApprovedRoles();
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

  // Get All roles
  getUnApprovedRoles(){
    this.homeService.getUnApprovedRoles().subscribe((result: any) => {
        this.allUnApproveRoleList = result;
        this.getUnApprovedUsers();
        this.getUnApprovedTellers();
        this.getApprovedRoles();
        this.getUsers();
        this.getBranches();
        this.getAllApplications();
        this.getRoles();
    })
  }

  // Get All Unapproved Users
  getUnApprovedUsers(){
    this.homeService.getUnApprovedUsers().subscribe((result: any) => {
      this.allUnApproveUserList = result;
    })
  }

  // Get All Unapproved Teller
  getUnApprovedTellers(){
    this.homeService.getTellers().subscribe((result: any) => {
      this.allUnApproveTellerList = result.value;
    })
  }

  // Get All Approved roles
  getApprovedRoles(){
    this.homeService.getApprovedRoles().subscribe((result: any) => {
      this.allApprovedRoleList = result;
    })
  }

  // For Users
  getUsers(){
    this.homeService.getUsers().subscribe((result: any) => {
      this.allUserList = result
    })
  }

  // Get All Branches
  getBranches(){
    this.homeService.getBranches().subscribe((result: any) => {
      this.allBranchList = result.value;
    })
  }

  // For Applications
  getAllApplications(){
    this.homeService.getAllApplications().subscribe((result: any) => {
      this.allApplicationList = result;
    })
  }

  // For All Roles
  getRoles(){
    this.homeService.getRoles().subscribe((result: any) => {
      this.allRoleList = result;
    })
  }



}
