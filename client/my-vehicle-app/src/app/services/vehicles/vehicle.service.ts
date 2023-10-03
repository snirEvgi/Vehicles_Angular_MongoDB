import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = "http://localhost:4503";

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vehicles`);
  }

  addVehicle(vehicle: any): Observable<any> {
    console.log(JSON.parse(vehicle), "assssssssssssssss");

    const { Name, price, _id } = JSON.parse(vehicle)

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // const auditLogData = {
    //   _id: _id,
    //   price: price,
    //   oldPrice: 0,
    //   action: 'ADD',
    //   details: `Added new vehicle: ${Name}`
    // };
    // const audit = this.addAuditLog(auditLogData)
    const data = this.http.post<any>(`${this.apiUrl}/vehicles/newVehicle`, vehicle, { headers: headers });
    return data
  }
  updateVehicle(vehicleData: any): Observable<any> {
    const { _id } = vehicleData
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.apiUrl}/vehicles/updateVehicle/${_id}`, vehicleData, { headers: headers });

  }
  removeVehicle(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/vehicles/remove/${id}`);
  }

 

  getFilteredVehicles(filterCriteria: any) {
    

    if (filterCriteria.hp === null||filterCriteria.acc === null){
      return this.http.get<any[]>(`${this.apiUrl}/vehicles`);

    } else {
      const queryParams = { ...filterCriteria };

      console.log(queryParams);

      return this.http.get(`${this.apiUrl}/vehicles`, { params: queryParams });
    }
  }


}
