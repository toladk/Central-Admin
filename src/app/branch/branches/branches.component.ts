import { HomeService } from './../../home/services/home.service';
import { Component, OnInit } from '@angular/core';
import { BranchService, Branch } from './../services/branch.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.sass']
})
export class BranchesComponent implements OnInit {
  loader = true;

  //Drawer
  visible = false;
  visible2 = false;

  // Pagination
  pagination: number = 1;

  // FILTERING
  sortingName: string;

  branchResult = [];
  allBranchList = [];
  error = '';
  submitted = false;

  branchForm: FormGroup;
  editBranchForm: FormGroup;
  bran: Branch = new Branch(0, '', 0);

   // For Permission
   usernameResult = [];
   permList = [];
   permissionList = [];
   count = 0;

  constructor(
    private branchService: BranchService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private homeService: HomeService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.branchForm = this.formBuilder.group({
      branchName: ['', Validators.required],
      solid: ['', Validators.required],
    });
    this.editBranchForm = this.formBuilder.group({
      branchName: ['', Validators.required],
      solid: ['', Validators.required],
    });

    this.getBranches();
    this.getUserByUsername();
  }

  // For Search
  SearchByName(){
    if(this.sortingName != ""){
    this.allBranchList = this.allBranchList.filter(res => {
      return res.branchName.toLocaleLowerCase().match(this.sortingName.toLocaleLowerCase());
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
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  closeEdit(): void {
    this.visible2 = false;
  }

  // Clear Form
  clearForm() {
    this.branchForm.reset();
  }
  clearForm2(){
    this.editBranchForm.reset();
  }

  // Get All Branches
  getBranches(){
    this.branchService.getBranches().subscribe((result: any) => {
      this.allBranchList = result.value;
      if(result.isSuccess === true){
        this.loader = false;
      }
    },error => {
      this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
    })
  }

  createBranch(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.branchForm.invalid) {
      return;
    }else {
        this.branchService.createBranch(this.bran).subscribe((result: any) => {
        this.branchResult = result;
        if(result.IsSuccess === true){
          this.clearForm();
        this.visible = false;
        this.getBranches();
        this.showNotification('snackbar-success','Branch Created Succesfully !!!','top','Right');
        }
      },error => {
        this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
      });
    }
  }

  updateBra(bran){
    console.log(bran);
    this.visible2 = true;
    this.bran.id = bran.id;
    this.bran.branchName = bran.branchName;
    this.bran.solid = bran.solid;
  }
  updateBranch(){
    this.branchService.updateBranch(this.bran).subscribe((result: any) => {
      this.branchResult = result;
      if(result.IsSuccess === true){
        this.clearForm2();
        this.visible2 = false;
        this.getBranches();
        this.showNotification('snackbar-success','Branch Updated Succesfully !!!','top','Right');
      }
    },error => {
      this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
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

}
