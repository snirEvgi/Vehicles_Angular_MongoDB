import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditComponent } from './audit/audit.component';
import { UpdateVehicleComponent } from './update-vehicle/update-vehicle.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { VehiclesComponent } from './vehicles/vehicles.component';

const routes: Routes = [
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'add-vehicle', component: AddVehicleComponent },
  { path: 'update-vehicle', component: UpdateVehicleComponent },
  { path: 'audit', component: AuditComponent },
  { path: '', redirectTo: '/vehicles', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
