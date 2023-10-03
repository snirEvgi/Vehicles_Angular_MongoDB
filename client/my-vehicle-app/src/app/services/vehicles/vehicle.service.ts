import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = "http://localhost:4503";

  constructor(private http: HttpClient,private toastr: ToastrService) { }

  getVehicles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vehicles`);
  }

  addVehicle(vehicle: any): Observable<any> {
    const { Name, price, _id } = JSON.parse(vehicle);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
   
    return this.http.post<any>(`${this.apiUrl}/vehicles/newVehicle`, vehicle, { headers: headers })
      .pipe(
        tap(response => {
          this.toastr.success('Vehicle added successfully!', 'Success' ,{ timeOut: 3000, progressBar: true, progressAnimation: 'increasing', positionClass: 'toast-top-right', toastClass: 'toast-success' });
        }),
        catchError(error => {
          this.toastr.error('Failed to add vehicle. Please try again.', 'Error'),{ timeOut: 3000, progressBar: true, progressAnimation: 'increasing', positionClass: 'toast-top-right', toastClass: 'toast-error' };
          throw error; 
        })
      );
  }

  updateVehicle(vehicleData: any): Observable<any> {
    const { _id } = vehicleData;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.put<any>(`${this.apiUrl}/vehicles/updateVehicle/${_id}`, vehicleData, { headers: headers })
      .pipe(
        tap(response => {
          this.toastr.success('Vehicle updated successfully!', 'Success',{ timeOut: 3000, progressBar: true, progressAnimation: 'increasing', positionClass: 'toast-top-right', toastClass: 'toast-success'});
        }),
        catchError(error => {
          this.toastr.error('Failed to update vehicle. Please try again.', 'Error',{ timeOut: 3000, progressBar: true, progressAnimation: 'increasing', positionClass: 'toast-top-right', toastClass: 'toast-error'});
          throw error; 
        })
      );
  }

  removeVehicle(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/vehicles/remove?id=${id}`)
      .pipe(
        tap(response => {
          this.toastr.success('Vehicle removed successfully!', 'Success');
        }),
        catchError(error => {
          this.toastr.error('Failed to remove vehicle. Please try again.', 'Error');
          throw error; 
        })
      );
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
