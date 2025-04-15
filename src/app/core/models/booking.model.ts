// src/app/models/booking.model.ts
export interface Booking {
    id: string;
    userId: string;
    deviceModelId: number;
    repairIssueId: number;
    status: string;
    bookingDate: string;
    estimatedDelivery: string;
    totalPrice: number;
    technicianId: string;
  }
  