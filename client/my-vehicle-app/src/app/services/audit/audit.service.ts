import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditService {
  private apiUrl = "http://localhost:4503";


  constructor(private http: HttpClient) {
  }
  
  getAudit(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/audit`);
  }

  addAuditLog(log: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(`${this.apiUrl}/audit/new`, log);
  }
}
