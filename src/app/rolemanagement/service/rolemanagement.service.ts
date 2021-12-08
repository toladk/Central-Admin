import { apiPort } from 'src/apiPort';
//import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export class ApproveRole {
  constructor(
    public id: 0,
  ){}
}

export class CreateRole {
  constructor(
    public id: 0,
    public roleName: string,
    public isTeller: boolean,
    public permissions: [{id: 0, title: '', name: '', applicationName: ''}],
    public applicationId: 0,
  ){}
}

@Injectable({
  providedIn: 'root'
})
export class RolemanagementService {

  constructor(
    private http: HttpClient
  ) { }

  createRole(payload){
    return this.http.post<any>(`${apiPort.apiUrl}/createRole`, payload, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  getApprovedRoles() {
    return this.http.get(`${apiPort.apiUrl}/getApprovedRoles`, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  getAllApplications() {
    return this.http.get(`${apiPort.apiUrl}/getAllApplications`, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  getUnApprovedRoles() {
    return this.http.get(`${apiPort.apiUrl}/getUnApprovedRoles`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  getAllPermissionsByApplicationName(name) {
    return this.http.get(`${apiPort.apiUrl}/getAllPermissionsByApplicationName/${name}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  approveRole( id, approverId ){
    let payload = { id, approverId }
    return this.http.post(`${apiPort.apiUrl}/approveRole`, payload, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  manageRole(payload){
    return this.http.post<any>(`${apiPort.apiUrl}/manageRole`, payload, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  getRoleById(id){
    return this.http.get(`${apiPort.apiUrl}/getRoleById/${id}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

}
