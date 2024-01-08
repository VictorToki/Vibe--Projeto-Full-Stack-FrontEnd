import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API = 'http://localhost:8000/api'

@Injectable({
    providedIn: 'root',
})
export class LogService {
    private apiUrl = API + '/logs';

    constructor(private http: HttpClient) {}

    logAction(id:number, action: string) {
      return this.http.post(this.apiUrl + '/new', { 
        id: id,
        action: action,
      });
    }
}