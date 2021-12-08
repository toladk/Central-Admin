import { apiPort } from 'src/apiPort';
//import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Application {
  constructor(
    public id: 0,
    public applicationName: string,
    public title: string,
    public description: string,
  ){}
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(
    private http: HttpClient
  ) { }

  getAllApplications() {
    return this.http.get(`${apiPort.apiUrl}/getAllApplications`, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  createApplication(payload) {
    return this.http.post<Application>(`${apiPort.apiUrl}/createApplication`, payload, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  updateApplication(payload){
    return this.http.post<Application>(`${apiPort.apiUrl}/updateApplication`, payload, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  deleteApplication(id){
    let payload = { id }
    return this.http.post<Application>(`${apiPort.apiUrl}/deleteApplication`, payload, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

}
