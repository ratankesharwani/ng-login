import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {RegisterRequest} from '../data/register';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  login(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  getActor(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/actors/search`, data);
  }
}
