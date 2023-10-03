import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '../services/vehicles/vehicle.service';
import { AuditService } from '../services/audit/audit.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent {
  vehicleForm: FormGroup;

  constructor(private fb: FormBuilder, private vehicleService: VehicleService, private auditService: AuditService) {
    this.vehicleForm = this.fb.group({
      Name: ['', Validators.required],
      Miles_per_Gallon: [null, Validators.required],
      Cylinders: [null, Validators.required],
      Displacement: [null, Validators.required],
      Horsepower: [null, Validators.required],
      Weight_in_lbs: [null, Validators.required],
      Acceleration: [null, Validators.required],
      Year: [null, Validators.required],
      price: [null, Validators.required],
      Origin: [null, Validators.required]
    });
  }

  async onSubmit() {
    if (this.vehicleForm.valid) {
      const newVehicle = this.vehicleForm.value;
      const sValue = JSON.stringify(newVehicle);
      try {
        const result = await this.vehicleService.addVehicle(sValue).toPromise();
        const {  price } = newVehicle
        const { _id } = result
        
        
        const auditLogData = {
          _id: _id,
          price: price,
          oldPrice: 0,
          action: 'ADD',
          details: `Added new vehicle: ${_id}`
        };
        
        if (auditLogData.price !== null && auditLogData.price !== undefined && !isNaN(auditLogData.price)) {
          try {
            const audit = await this.auditService.addAuditLog(auditLogData).toPromise()
          } catch (error) {
            console.log(error);

          }
        }
        this.vehicleForm.reset();

      } catch (error) {
        console.error('Error adding vehicle:', error);
      }
    }
  }
}
