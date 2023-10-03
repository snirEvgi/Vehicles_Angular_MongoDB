import { Component } from '@angular/core';
import { VehicleService } from '../services/vehicles/vehicle.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuditService } from '../services/audit/audit.service';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.css']
})
export class UpdateVehicleComponent {

  vehicleForm: FormGroup;
  constructor(private fb: FormBuilder, private vehicleService: VehicleService, private auditService: AuditService) {
    this.vehicleForm = this.fb.group({
      _id: ['', Validators.required],
      price: [null, Validators.required],
      oldPrice: [null, Validators.required],
    });
  }

  async onSubmit() {
    if (this.vehicleForm.valid) {
      const newVehicle = this.vehicleForm.value;

      try {
        const result = await this.vehicleService.updateVehicle(newVehicle).toPromise();
        const { _id, price, oldPrice, } = newVehicle
        const auditLogData = {
          _id: _id,
          price: Number(price),
          oldPrice: Number(oldPrice),
          action: 'UPDATE',
          details: `Updated vehicle price - from ${oldPrice} to ${price}`
        };
        console.log(auditLogData);

        if (auditLogData.price !== null && auditLogData.price !== undefined && !isNaN(auditLogData.price)) {
          try {
            const audit = await this.auditService.addAuditLog(auditLogData).toPromise()
          } catch (error) {
            console.log(error);

          }
        }

        this.vehicleForm.reset();

      } catch (error) {
        console.error('Error Updating vehicle:', error);
      }




    }

  }
}
