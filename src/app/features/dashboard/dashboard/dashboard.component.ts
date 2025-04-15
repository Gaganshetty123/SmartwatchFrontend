import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-dashboard',
  standalone:false,
  template: '<div>Redirecting...</div>',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Redirect to appropriate dashboard based on user role
  }
}