import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  url: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTransfers(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  createTransfer(data: any): Observable<any> {
    return this.http.post<any>(this.url, data);
  }
}