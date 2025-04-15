// src/app/services/booking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Booking } from '../models/booking.model';



@Injectable({
  providedIn: 'root'
})
export class BookingService {
    private bookingsUrl = `${environment.apiUrl}/bookings`;
  private apiUrl = `${environment.apiUrl}/bookings/admin`;  // API endpoint for fetching bookings

  constructor(private http: HttpClient) { }

  getBookings(): Observable<any> {
    return this.http.get<any>(this.apiUrl);  // Adjusted to expect the structure of the response
  }
  updateBooking(booking: Booking): Observable<any> {
    return this.http.put(`${this.bookingsUrl}/${booking.id}`, booking);
  }
  deleteBooking(id: string): Observable<any> {
    return this.http.delete(`${this.bookingsUrl}/${id}`);
  }
  
}
