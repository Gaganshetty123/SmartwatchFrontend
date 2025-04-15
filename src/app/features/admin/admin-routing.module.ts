import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BookingsComponent } from './bookings/bookings.component'; // For Bookings Section
import { BrandsComponent } from './brands/brands.component';
import { RepairIssuesComponent } from './repair-issues/repair-issues.component';
import { PaymentsComponent } from './payments/payments.component';
// Import other components similarly for Brands, Repair Issues, Payments.

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      { path: 'bookings', component: BookingsComponent }, // For Bookings
      { path: 'brands', component: BrandsComponent }, // Create this component
      { path: 'repair-issues', component: RepairIssuesComponent }, // Create this component
      { path: 'payments', component: PaymentsComponent } // Create this component
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
