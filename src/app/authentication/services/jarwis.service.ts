import { apiPort } from './../../../apiPort';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {

  constructor(private http : HttpClient) { }

  signup(data) {
    return this.http.post(`${apiPort.baseUrl}/signup` ,data)
  }

  login(data) {
    console.log('Checking the endpoint the angular calls', apiPort);
    return this.http.post(`${apiPort.baseUrl}/adloginv3` , data)
  }

}
