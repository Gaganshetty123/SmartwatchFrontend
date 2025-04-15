import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule here
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BookingsComponent } from './bookings/bookings.component';
import { BrandsComponent } from './brands/brands.component';
import { RepairIssuesComponent } from './repair-issues/repair-issues.component';
import { FormsModule } from '@angular/forms';
import { PaymentsComponent } from './payments/payments.component';

// Import components for Admin Section
// Example component
// Add other components like BrandsComponent, RepairIssuesComponent, etc.

@NgModule({
  declarations: [
    AdminDashboardComponent,
    BookingsComponent,
    BrandsComponent,
    RepairIssuesComponent,
    PaymentsComponent
    // Add other components here
  ],
  imports: [
    CommonModule,
    RouterModule, // Add RouterModule here for routing
    AdminRoutingModule,
    FormsModule  // This will handle child routing for this module
  ]
})
export class AdminModule { }
