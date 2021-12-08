import { apiPort } from 'src/apiPort';
//import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

export class Branch {
  constructor(
    public id: 0,
    public branchName: string,
    public solid: 0,
  ){}
}

export class Teller {
  constructor(
    public id: 0,
    public userId: string,
    public username: string,
    public profileId: 0,
    public solId: string,
    public email: string,
  ){}
}

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers() {
    return this.http.get(`${apiPort.apiUrl}/getUsers`, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  // Teller
  getAllTellers() {
    return this.http.get(`${apiPort.apiUrl}/getTellers?PageNumber=1`, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  getTellerProfiles() {
    return this.http.get(`${apiPort.apiUrl}/getTellerProfiles`, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  createTeller(payload){
    return this.http.post<Teller>(`${apiPort.apiUrl}/createTeller`, payload, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  updateTeller(payload){
    return this.http.post<Branch>(`${apiPort.apiUrl}/updateTeller`, payload, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  // Branch
  getBranches() {
    return this.http.get(`${apiPort.apiUrl}/getBranches`, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  createBranch(payload) {
    return this.http.post<Branch>(`${apiPort.apiUrl}/createBranch`, payload, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  updateBranch(payload) {
    return this.http.post<Branch>(`${apiPort.apiUrl}/updateBranch`, payload, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  getUserByUsername(username){
    return this.http.get(`${apiPort.apiUrl}/getUserByUsername/${username}`, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  getTellerById(id){
    const params = new HttpParams()
    .set("id", id)
    return this.http.get(`${apiPort.apiUrl}/getTellerById?${params}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

}
