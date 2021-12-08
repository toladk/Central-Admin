import { BranchService, Teller } from './../services/branch.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tellers',
  templateUrl: './tellers.component.html',
  styleUrls: ['./tellers.component.sass']
})
export class TellersComponent implements OnInit {
  loader = true;

  //Drawer
  visible = false;
  visible2 = false;

  // Pagination
  pagination: number = 1;

  // FILTERING
  sortingName: string;

  submitted = false;
  allTellerList: any;
  allUserList = [];
  allBranchList = [];
  allTellerProfileList = [];
  error: string;
  tellerResult = [];
  userDetails: any;

  tellerForm: FormGroup;
  editTellerForm: FormGroup;
  tell: any;

  // form binding
  formUserId: any;
  formEmail: any;
  formSolId: any;

  constructor(
    private branchService: BranchService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.tellerForm = this.formBuilder.group({
      id: [''],
      userId: ['', Validators.required],
      profileId: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      solId: ['', Validators.required],
    });

    this.getAllTellers();
    this.getUsers();
    this.getBranches();
    this.getTellerProfile();
  }

  // For Search
  SearchByName(){
    if(this.sortingName != ""){
    this.allTellerList = this.allTellerList.filter(res => {
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

  // Clear Form
  clearForm(){
    this.tellerForm.reset();
  }
  clearForm2(){
    this.editTellerForm.reset();
  }

  // Get All Tellers
  getAllTellers(){
    this.branchService.getAllTellers().subscribe((result: any) => {
      this.allTellerList = result.value;
      this.loader = false;
      // console.log(this.allTellerList);
    })
  }

  createTeller(){
    // this.submitted = true;
    // stop here if form is invalid
    console.log(this.tellerForm.value);
    // if (this.tellerForm.invalid) {
    //   return;
    // }else {
      delete this.tellerForm.value.applicationId;
        this.branchService.createTeller(this.tellerForm.value).subscribe((result: any) => {
        this.tellerResult = result;
        this.clearForm();
        // alert(this.tellerResult);
        this.visible = false;
        this.getAllTellers();
        this.showNotification('snackbar-success','Teller Assigned Succesfully !!!','top','Right');
      },error => {
        this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
      });

    // }
  }

  //update Teller
  updateTel(tell){
    this.visible2 = true;
    this.branchService.getTellerById(tell.id).subscribe((result: any) => {
      this.tellerForm.patchValue({...result.value});
    })
  }
  updateTeller(){
    this.branchService.updateTeller(this.tellerForm.value).subscribe((result: any) => {
      this.tellerResult = result;
      if(result.IsSuccess === true){
        this.clearForm2();
        this.visible2 = false;
        this.getAllTellers();
        this.showNotification('snackbar-success','Teller Updated Succesfully !!!','top','Right');
      }
    },error => {
      this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
    });
  }

  // Get Users
  getUsers(){
    this.branchService.getUsers().subscribe((result: any) => {
      this.allUserList = result;
      // console.log(this.allUserList);
    },error => {
      this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
    })
  }

  // Get Branch
  getBranches(){
    this.branchService.getBranches().subscribe((result: any) => {
      this.allBranchList = result.value;
      // console.log(this.allBranchList);
    },error => {
      this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
    })
  }

  // Get Branch
  getTellerProfile(){
    this.branchService.getTellerProfiles().subscribe((result: any) => {
      this.allTellerProfileList = result.value;
      // console.log(this.allTellerProfileList);
    },error => {
      this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
    })
  }

  // To pass user details to form
  getUserByUsername(name){
    this.branchService.getUserByUsername(name.username).subscribe((result: any) => {
      this.userDetails = result;

      this.formUserId = this.userDetails.id;
      this.formEmail = this.userDetails.email;
      this.formSolId = this.userDetails.soldId;
    })
  }

}
