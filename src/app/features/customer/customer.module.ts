import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
// Adjust path as necessary

@NgModule({
  declarations: [
    CustomerDashboardComponent  // Declare the CustomerDashboardComponent here
  ],
  imports: [
    CommonModule,  // Import CommonModule for directives like *ngFor
    CustomerRoutingModule  // Import the CustomerRoutingModule
  ]
})
export class CustomerModule { }
