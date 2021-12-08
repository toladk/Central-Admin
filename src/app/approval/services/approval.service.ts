import { apiPort } from 'src/apiPort';
//import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class ApproveRole {
  constructor(
    public id: 0,
    public approverId: string,
  ){}
}

export class ApproveUser {
  constructor(
    public id: 0,
    public approverId: string,
  ){}
}

export class ApproveTeller {
  constructor(
    public userId: string,
    public approvedBy: string,
  ){}
}

export class DisapproveTeller {
  constructor(
    public userId: string,
    public approvedBy: string,
  ){}
}

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {

  constructor(
    private http: HttpClient
  ) { }

  // For Roles
  getUnApprovedRoles() {
    return this.http.get(`${apiPort.apiUrl}/getUnApprovedRoles`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  approveRole( id, approverId ){
    let payload = { id, approverId }
    return this.http.post(`${apiPort.apiUrl}/approveRole`, payload, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  // For Users
  getUnApprovedUsers() {
    return this.http.get(`${apiPort.apiUrl}/getUnApprovedUsers`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  approveUser( id, approverId ){
    let payload = { id, approverId }
    return this.http.post(`${apiPort.apiUrl}/approveUser`, payload, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  // For Tellers
  getTellers(){
    return this.http.get(`${apiPort.apiUrl}/getTellers?PageNumber=1`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  approveTeller( userId, approvedBy ){
    let payload = { userId, approvedBy }
    return this.http.post(`${apiPort.apiUrl}/approveTeller`, payload, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  disapproveTeller( userId, username ){
    let payload = { userId, username }
    return this.http.post(`${apiPort.apiUrl}/disapproveTeller`, payload, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }




}
