export interface Payment {
    id: number;
    bookingId: number;
    transactionId: string;
    amountPaid: number;
    paymentDate: string;
    paymentMethod: string;
    status: string;
  }
  