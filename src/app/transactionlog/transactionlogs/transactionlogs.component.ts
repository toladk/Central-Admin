import { TransactionlogService } from './../services/transactionlog.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressButtonOptions } from 'mat-progress-buttons';

@Component({
  selector: 'app-transactionlogs',
  templateUrl: './transactionlogs.component.html',
  styleUrls: ['./transactionlogs.component.sass']
})
export class TransactionlogsComponent implements OnInit {
  isShown: boolean = false ;
  // loader = true;

  // Pagination
  pagination: number = 1;

  // FILTERING
  sortingName: string;

  transactionLogResult = [];
  allTransactionLogList = [];
  error: string;
  submitted = false;

  transactionLogForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private transactionlogService: TransactionlogService
  ) { }

  ngOnInit(): void {
    this.transactionLogForm = this.formBuilder.group({
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
    return this.transactionLogForm.controls;
  }

  // For Search
  SearchByName(){
    if(this.sortingName != ""){
    this.allTransactionLogList = this.allTransactionLogList.filter(res => {
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

  // Reload Page
  reloadPage(){
    window.location.reload();
  }

  // Get All AuditLog
  gettransactionLog(){
    this.transactionlogService.gettransactionLog(this.f.applicationName.value, this.f.startDate.value, this.f.endDate.value, this.f.identifier.value).subscribe((result: any) => {
      this.allTransactionLogList = result.value;
      if(result.isSuccess === true){
        this.isShown = ! this.isShown;
      console.log(this.allTransactionLogList);
      }
    },error => {
      this.showNotification("snackbar-danger", error.description || error.error.Error, "top", "Right");
    })
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
    this.transactionlogService.exportAsExcelFile(this.allTransactionLogList, 'Transaction Logs');
  }

}
