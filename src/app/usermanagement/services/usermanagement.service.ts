import { apiPort } from 'src/apiPort';
//import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class UsermanagementService {

  constructor(
    private http: HttpClient
  ) { }

  createUser(payload){
    return this.http.post<any>(`${apiPort.apiUrl}/createUser`, payload, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  updateUsersRoles(payload){
    return this.http.post<any>(`${apiPort.apiUrl}/updateUsersRoles`, payload, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  getUsers() {
    console.log('checking for the config file angular calls', apiPort);
    return this.http.get(`${apiPort.apiUrl}/getUsers`, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  getUserById(id){
    return this.http.get(`${apiPort.apiUrl}/getUser/${id}`, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  getApprovedRoles() {
    return this.http.get(`${apiPort.apiUrl}/getApprovedRoles`, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  getBranches() {
    return this.http.get(`${apiPort.apiUrl}/getBranches`, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  enableUser(userId){
    let payload = { userId }
    return this.http.post(`${apiPort.apiUrl}/enableUser/${userId}`, payload, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  disableUser(userId){
    let payload = { userId }
    return this.http.post(`${apiPort.apiUrl}/disableUser/${userId}`, payload, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  clearUserRole(userId, roleId){
    let payload = { userId, roleId }
    return this.http.post(`${apiPort.apiUrl}/clearUserRole`, payload, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  getUserByUsername(username){
    return this.http.get(`${apiPort.apiUrl}/getUserByUsername/${username}`, {headers:{
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
