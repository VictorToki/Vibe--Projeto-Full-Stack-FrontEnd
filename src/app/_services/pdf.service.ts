import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = 'http://localhost:8000/api/formularios'

@Injectable({
  providedIn: 'root'
})
export class PDFService {
  constructor(private http: HttpClient) {}

  downloadPdf(id: string): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/pdf' });

    return this.http.get(`${API}/formulario/generate-pdf/${id}`, {
      responseType: 'blob',
      headers: headers
    });

  }
}