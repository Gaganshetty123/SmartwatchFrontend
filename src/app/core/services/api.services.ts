import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  
  /**
   * Generic GET method to fetch data from API
   * @param endpoint API endpoint path
   * @returns Observable of response data
   */
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${environment.apiUrl}${endpoint}`);
  }
  
  /**
   * Generic POST method to send data to API
   * @param endpoint API endpoint path
   * @param data Request payload
   * @returns Observable of response data
   */
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${environment.apiUrl}${endpoint}`, data);
  }
  
  /**
   * Generic PUT method to update data via API
   * @param endpoint API endpoint path
   * @param data Request payload
   * @returns Observable of response data
   */
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${environment.apiUrl}${endpoint}`, data);
  }
  
  /**
   * Generic DELETE method to remove data via API
   * @param endpoint API endpoint path
   * @returns Observable of response data
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${environment.apiUrl}${endpoint}`);
  }
}