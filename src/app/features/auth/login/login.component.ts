import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  returnUrl: string = '/dashboard';
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // If already authenticated, redirect to the appropriate dashboard
    if (this.authService.isAuthenticated()) {
      console.log('User already authenticated. Redirecting based on role.'); // Debugging line
      this.redirectBasedOnRole(); // Redirect based on role (admin, customer, technician)
    }
  }
  

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Get return URL from route parameters or default to '/dashboard'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  // Getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  // Method to handle role-based redirection
  private redirectBasedOnRole(): void {
    const userRole = this.authService.getUserRole();

    // Redirect based on the role
    switch (userRole) {
      case 'admin':
        this.router.navigate(['/admin']);
        break;
      case 'customer':
        this.router.navigate(['/customer']);
        break;
      case 'technician':
        this.router.navigate(['/technician']);
        break;
      default:
        this.router.navigate(['/dashboard']);
        break;
    }
  }

  // Password visibility toggle method
  togglePasswordVisibility(event: Event): void {
    event.preventDefault();
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = this.showPassword ? 'text' : 'password';
    }
  }

  // Form submit method
  onSubmit(): void {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';
    
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (user) => {
        console.log("Logged in ",user);
        this.redirectBasedOnRole(); // ✅ correct redirect
        this.loading = false;
      },
      error: () => {
        this.error = 'Login failed';
        this.loading = false;
      }
    });
    
  }
}
