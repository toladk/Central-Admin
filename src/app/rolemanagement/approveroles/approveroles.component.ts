import { Component, OnInit } from '@angular/core';
import { RolemanagementService, ApproveRole } from './../service/rolemanagement.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-approveroles',
  templateUrl: './approveroles.component.html',
  styleUrls: ['./approveroles.component.sass']
})
export class ApproverolesComponent implements OnInit {
  // Pagination
  pagination: number = 1;

  // FILTERING
  sortingName: string;

  allUnApproveRoleList = [];
  error: string;
  approveResult: string;
  appro: ApproveRole = new ApproveRole( 0 );

  constructor(
    private roleManagementService: RolemanagementService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUnApprovedRoles();
  }

  // For Search
  SearchByName(){
    if(this.sortingName != ""){
    this.allUnApproveRoleList = this.allUnApproveRoleList.filter(res => {
      return res.roleName.toLocaleLowerCase().match(this.sortingName.toLocaleLowerCase());
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

  // Get All roles
  getUnApprovedRoles(){
    this.roleManagementService.getUnApprovedRoles().subscribe((result: any) => {
      this.allUnApproveRoleList = result;
      // console.log(this.allUnApproveRoleList)
    })
  }

  // Aprrove Role
  approveRole(appro){
    this.roleManagementService.approveRole(appro.id, '').subscribe((result: any) => {
      this.approveResult = result;
      this.getUnApprovedRoles();
      // console.log(result);
      this.showNotification('snackbar-success','Role Approved Succesfully !!!','top','Right');
    })
  }

}
