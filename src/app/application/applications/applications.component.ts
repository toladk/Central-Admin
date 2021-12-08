import { ApplicationService, Application } from './../services/application.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.sass']
})
export class ApplicationsComponent implements OnInit {
  loader = true;

  //Drawer
  visible = false;
  visible2 = false;

  // Pagination
  pagination: number = 1;

  // FILTERING
  sortingName: string;

  applicationResult = [];
  allApplicationList = [];

  error: string;
  submitted = false;

  appForm: FormGroup;
  editAppForm: FormGroup;
  applic: Application = new Application(0, '', '', '');

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private applicationService: ApplicationService
  ) { }

  ngOnInit(): void {
    this.appForm = this.formBuilder.group({
      applicationName: ['', Validators.required],
      description: ['', Validators.required],
      title: ['', Validators.required],
    });
    this.editAppForm = this.formBuilder.group({
      applicationName: ['', Validators.required],
      description: ['', Validators.required],
      title: ['', Validators.required],
    });

    this.getAllApplications();
  }

  // For Search
  SearchByName(){
    if(this.sortingName != ""){
    this.allApplicationList = this.allApplicationList.filter(res => {
      return res.applicationName.toLocaleLowerCase().match(this.sortingName.toLocaleLowerCase());
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
    this.appForm.reset();
  }
  clearForm2() {
    this.editAppForm.reset();
  }

  // Applications
  getAllApplications(){
    this.applicationService.getAllApplications().subscribe((result: any) => {
      this.allApplicationList = result;
      this.loader = false;
      // console.log(this.allApplicationList);
    },error => {
      this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
    })
  }

  createApplication(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.appForm.invalid) {
      return;
    }else {
        this.applicationService.createApplication(this.applic).subscribe((result: any) => {
        this.applicationResult = result;
        this.clearForm();
        this.visible = false;
        this.getAllApplications();
        this.showNotification('snackbar-success','Application Created Succesfully !!!','top','Right');
      },error => {
        // console.log(error);
        this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
      });
    }
  }

  updateApp(applic){
    this.visible2 = true;
    this.applic.id = applic.id;
    this.applic.applicationName = applic.applicationName;
    this.applic.title = applic.title;
    this.applic.description = applic.description;
  }
  updateApplication(){
    this.applicationService.updateApplication(this.applic).subscribe((result: any) => {
      this.applicationResult = result;
      this.clearForm2();
      this.visible2 = false;
      this.getAllApplications();
      this.showNotification('snackbar-success','Application Updated Succesfully !!!','top','Right');
    },error => {
      this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
    });
  }

  deleteApplication(applic){
    this.applicationService.deleteApplication(applic.id).subscribe((result: any) => {
      this.applicationResult = result;
      this.getAllApplications();
      this.showNotification('snackbar-success', 'Application Deleted Succesfully !!!', 'top', 'Right');
    },error => {
      this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
    })
  }

}
