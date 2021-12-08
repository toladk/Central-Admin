import { apiPort } from 'src/apiPort';
//import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from "@angular/common/http";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

// export class AuditLog {
//   constructor(
//     public ipAddress: string,
//     public applicationName: string,
//     public operationExecuted: string,
//     public requestData: string,
//     public responseData: string,
//     public executedBy: string,
//     public resultStatus: string,
//   ){}
// }

@Injectable({
  providedIn: 'root'
})
export class AuditlogService {

  constructor(
    private http: HttpClient
  ) { }

  // createAuditLog(payload){
  //   return this.http.post<AuditLog>(`${environment.apiUrl}/createAuditLog`, payload, {headers:{
  //     Authorization:`${localStorage.token}`
  //   }})
  // }

  // getAuditLog(applicationName, startDate, endDate){
  //   return this.http.get<AuditLog>(`${environment.apiUrl}/getAuditLog?ApplicationName=${applicationName}&StartDate=${startDate}&EndDate=${endDate}&Identifier=asas&PageNumber=1`, {headers:{
  //     Authorization:`${localStorage.token}`
  //   }})
  // }

  getAuditLog(applicationName, startDate: Date, endDate: Date, identifier){
    const params = new HttpParams()
      .set("ApplicationName", applicationName)
      .set("StartDate", startDate.toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }))
      .set("EndDate", endDate.toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }))
      .set("Identifier", identifier)
      .set("PageNumber", '1')
      .set("PageSize", '100000');
    return this.http.get(`${apiPort.apiUrl}/getAuditLog?${params}`, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  // For Exporting Excel
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

}
