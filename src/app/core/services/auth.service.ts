import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  
  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
  
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
  
  // Changed method signature from username to email
  login(email: string, password: string): Observable<User> {
    console.log('Login called with email:', email); // Debugging line
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        map(response => {
          const token = response.token;
          console.log('Login response token:', token); // Debugging line
          
          const decodedToken = this.decodeToken(token);
  
          const user: User = {
            id: decodedToken?.id || 'default-id',
            username: email.split('@')[0],
            email: email,
            token: token,
            role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]?.toLowerCase() || ''
          };
  
          // Store user details and token in local storage
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
  
          return user;
        }),
        catchError(error => {
          console.error('Login error:', error); // Debugging line
          return throwError(error);
        })
      );
  
  
  }
  
 
  logout(): void {
    console.log('Logging out'); // Debugging line
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
  
  
  getUserRole(): string {
    // Get the user data from storage
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        // Return the role (adjust property name if needed based on your user object structure)
       console.log("User role",user.role)
        return user.role || '';
      } catch (e) {
        console.error('Error parsing user data:', e);
        return '';
      }
    }
    return '';
  }
  
  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }
  
  isCustomer(): boolean {
    return this.getUserRole() === 'customer';
  }
  
  isTechnician(): boolean {
    return this.getUserRole() === 'technician';
  }

  


  private decodeToken(token: string): any {
    try {
      // Decode the JWT token to extract payload
      const payload = atob(token.split('.')[1]);
      return JSON.parse(payload);
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }
}