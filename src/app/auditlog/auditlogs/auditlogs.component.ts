import { AuditlogService } from './../services/auditlog.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressButtonOptions } from 'mat-progress-buttons';

@Component({
  selector: 'app-auditlogs',
  templateUrl: './auditlogs.component.html',
  styleUrls: ['./auditlogs.component.sass']
})
export class AuditlogsComponent implements OnInit {
  isShown: boolean = false ;
  loader = true;
  show = false;

  // Pagination
  pagination: number = 1;

  // FILTERING
  sortingName: string;
  executedName: string;

  auditLogResult = [];
  allAuditLogList = [];
  error: string;
  submitted = false;

  auditLogForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private auditLogService: AuditlogService
  ) { }

  ngOnInit(): void {
    this.auditLogForm = this.formBuilder.group({
      // ipAddress: ['', Validators.required],
      applicationName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      identifier: ['', Validators.required],
      // operationExecuted: ['', Validators.required],
      // requestData: ['', Validators.required],
      // responseData: ['', Validators.required],
      // executedBy: ['', Validators.required],
      // resultStatus: ['', Validators.required],
    });
  }
  get f() {
    return this.auditLogForm.controls;
  }

  // For Search
  SearchByName(){
    if(this.sortingName != ""){
    this.allAuditLogList = this.allAuditLogList.filter(res => {
      return res.applicationName.toLocaleLowerCase().match(this.sortingName.toLocaleLowerCase());
    });
    }else if (this.sortingName == ""){
      this.ngOnInit();
    }
  }

  SearchByExecutedName(){
    if(this.sortingName != ""){
    this.allAuditLogList = this.allAuditLogList.filter(res => {
      return res.executedBy.toLocaleLowerCase().match(this.executedName.toLocaleLowerCase());
    });
    }else if (this.executedName == ""){
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

  // Get All AuditLog
  getAuditLog(){
    this.auditLogService.getAuditLog(this.f.applicationName.value, this.f.startDate.value, this.f.endDate.value, this.f.identifier.value).subscribe((result: any) => {
      this.allAuditLogList = result.value;
      if(result.isSuccess === true){
        this.isShown = ! this.isShown;
      }
    },error => {
      this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
    })
  }

  // Reload Page
  reloadPage(){
    window.location.reload();
  }

  // Download Sheet
  barButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Download Report',
    buttonColor: 'accent',
    barColor: 'primary',
    raised: true,
    stroked: false,
    mode: 'indeterminate',
    value: 0,
    disabled: false,
    fullWidth: false,
    buttonIcon: {
      fontIcon: 'file_download'
    }
  };

  downloadData(){
    this.barButtonOptions.active = true;
    this.barButtonOptions.text = 'Downloading Report...';
    setTimeout(() => {
      this.barButtonOptions.active = false;
      this.barButtonOptions.text = 'Download Report';
    }, 3500);
    this.auditLogService.exportAsExcelFile(this.allAuditLogList, 'Audit Logs');
  }

}
