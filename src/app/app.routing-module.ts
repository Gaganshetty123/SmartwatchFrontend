import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { BrandsComponent } from './features/admin/brands/brands.component';
import { RepairIssuesComponent } from './features/admin/repair-issues/repair-issues.component';
import { PaymentsComponent } from './features/admin/payments/payments.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' },
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'brands',  // Add this route for brands
    component: BrandsComponent
  },
  { path: 'repair-issues', component: RepairIssuesComponent },
  { path: 'payments', component: PaymentsComponent },

  {
    path: 'customer',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'customer' },
    loadChildren: () => import('./features/customer/customer.module').then(m => m.CustomerModule)
  },
  {
    path: 'technician',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'technician' },
    loadChildren: () => import('./features/technician/technician.module').then(m => m.TechnicianModule)
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
