// src/app/features/bookings/bookings.component.ts
import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../core/services/booking.service';
import { Booking } from '../../../core/models/booking.model';
 // Import the Booking model

@Component({
  selector: 'app-bookings',
  standalone:false,
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  bookings: Booking[] = [];  // Declare bookings as an array of Booking type

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.loadBookings();  // Load bookings when the component initializes
  }
  getBookings(): void {
    this.bookingService.getBookings().subscribe((data) => {
      this.bookings = data;
    });
  }

  onUpdate(booking: Booking): void {
    this.bookingService.updateBooking(booking).subscribe(() => {
      this.getBookings();
    });
  }
  editingId: string | null = null;


  onEdit(bookingId: string): void {
    this.editingId = bookingId;
  }

  onSave(booking: Booking): void {
    console.log('Updating booking:', booking); // Confirm ID is present
    this.bookingService.updateBooking(booking).subscribe(() => {
      this.editingId = null;
      this.loadBookings();
    });
  }
  

  
  onDelete(id: string): void {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingService.deleteBooking(id).subscribe({
        next: () => {
          console.log(`Booking with ID ${id} deleted.`);
          this.loadBookings(); // Reload bookings after deletion
        },
        error: (err) => {
          console.error('Error deleting booking:', err);
        }
      });
    }
  }
  
  

  loadBookings(): void {
    this.bookingService.getBookings().subscribe({
      next: (data: any) => {
        this.bookings = data.data;  // Assign the "data" array from the response to the bookings array
      },
      error: (err) => {
        console.error('Error loading bookings', err);
      }
    });
  }
}
