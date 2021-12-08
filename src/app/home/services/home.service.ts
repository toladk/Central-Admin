import { apiPort } from 'src/apiPort';
//import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  bearer = 'Bearer';

  constructor(
    private http: HttpClient
  ) { }

  // For Roles
  getUnApprovedRoles() {
    console.log('Checking if bearer is passed', this.bearer);
    let autoo = `${this.bearer} ${localStorage.token}`;
    console.log('checking the bearer and token', autoo);
    return this.http.get(`${apiPort.apiUrl}/getUnApprovedRoles`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  // For Users
  getUnApprovedUsers() {
    return this.http.get(`${apiPort.apiUrl}/getUnApprovedUsers`, {headers: {
      Authorization: `${this.bearer} ${localStorage.token}`
    }});
  }

  // For Tellers
  getTellers(){
    return this.http.get(`${apiPort.apiUrl}/getTellers?PageNumber=1`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  // For Approved Roles
  getApprovedRoles() {
    return this.http.get(`${apiPort.apiUrl}/getApprovedRoles`, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  // For Get Users
  getUsers() {
    return this.http.get(`${apiPort.apiUrl}/getUsers`, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  // Branch
  getBranches() {
    return this.http.get(`${apiPort.apiUrl}/getBranches`, {headers:{
      Authorization:`Bearer ${localStorage.token}`
    }})
  }

  // For Application
  getAllApplications() {
    return this.http.get(`${apiPort.apiUrl}/getAllApplications`, {headers:{
      Authorization:`Bearer ${localStorage.token}`
    }})
  }

  // For All Roles
  getRoles() {
    return this.http.get(`${apiPort.apiUrl}/getRoles`, {headers:{
      Authorization:`Bearer ${localStorage.token}`
    }})
  }

  getUserByUsername(username){
    return this.http.get(`${apiPort.apiUrl}/getUserByUsername/${username}`, {headers:{
      Authorization:`Bearer ${localStorage.token}`
    }})
  }

}
