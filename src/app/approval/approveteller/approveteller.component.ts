import { HomeService } from './../../home/services/home.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApprovalService, ApproveTeller, DisapproveTeller } from './../services/approval.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approveteller',
  templateUrl: './approveteller.component.html',
  styleUrls: ['./approveteller.component.sass']
})
export class ApprovetellerComponent implements OnInit {
  loader = true;
  isSuccess: any;

  // Pagination
  pagination: number = 1;

  // FILTERING
  sortingName: string;

  allUnApproveTellerList = [];
  error: string;
  approveResult: string;
  appro: ApproveTeller = new ApproveTeller( '', '');
  disAppro: DisapproveTeller = new DisapproveTeller( '', '');

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
    this.getUnApprovedTellers();
    this.getUserByUsername();
  }

  // For Search
  SearchByName(){
    if(this.sortingName != ""){
    this.allUnApproveTellerList = this.allUnApproveTellerList.filter(res => {
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

  // Get All Unapproved Teller
  getUnApprovedTellers(){
    this.approvalService.getTellers().subscribe((result: any) => {
      this.allUnApproveTellerList = result.value;
      this.loader = false;
      // console.log(this.allUnApproveTellerList)
    },error => {
      this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
    })
  }

  // Aprrove Teller
  approveTeller(appro){
    this.approvalService.approveTeller(appro.userId, appro.approvedBy).subscribe((result: any) => {
      this.approveResult = result;
      this.getUnApprovedTellers();
      // console.log(result);
      this.showNotification('snackbar-success','Teller Approved Succesfully !!!','top','Right');
    },error => {
      this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
    })
  }

  // Aprrove Teller
  disapproveTeller(disAppro){
    this.approvalService.disapproveTeller(disAppro.userId, disAppro.approvedBy).subscribe((result: any) => {
      this.approveResult = result;
      this.getUnApprovedTellers();
      // console.log(result);
      this.showNotification('snackbar-success','Teller DisApproved Succesfully !!!','top','Right');
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
