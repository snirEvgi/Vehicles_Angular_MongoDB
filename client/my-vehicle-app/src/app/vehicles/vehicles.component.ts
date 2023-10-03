import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Vehicle } from './models';
import { VehicleService } from '../services/vehicles/vehicle.service';
import { AuditService } from '../services/audit/audit.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})


export class VehiclesComponent {
  public vehicles: Vehicle[]
  public filterCriteria: any = {};
  public tableHeaders: any[]
  public audit: any[]
  private url: string
  constructor(private vehicleService: VehicleService, private auditService: AuditService) {
    this.vehicles = []
    this.tableHeaders = []
    this.audit = []
    this.url = "http://localhost:4503"
  }
  async ngOnInit(): Promise<void> {
    try {
      const result = await this.vehicleService.getVehicles().toPromise();
      this.vehicles = result as any;
      if (this.vehicles.length > 0) {
        const headers = Object.keys(this.vehicles[0]);
        this.tableHeaders = headers;
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }


  }

  async getVehicles() {
    const result = await this.vehicleService.getVehicles();
    this.vehicles = result as any;
  }

  async deleteVehicle(id: string) {
    await this.vehicleService.removeVehicle(id);
    await this.getVehicles()
    const auditLogData = {
      vehicleId: id,
      newPrice: 0,
      oldPrice: 0,
      action: 'REMOVE',
      details: `Removed vehicle with ID: ${id}`
    };

    const audit = this.auditService.addAuditLog(auditLogData).toPromise()
    console.log(audit);
  }
  async applyFilters(): Promise<void> {
    try {
      const result = await this.vehicleService.getFilteredVehicles(this.filterCriteria).toPromise();
      this.vehicles = result as any;
      console.log(result);
      
    } catch (error) {
      console.error('Error fetching filtered vehicles:', error);
    }
  }
  async resetFilters(val:string): Promise<void> {
    try {
     
    } catch (error) {
      console.error('Error fetching filtered vehicles:', error);
    }
  }


}
