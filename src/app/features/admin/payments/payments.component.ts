import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../core/services/payment.service';
import { Payment } from '../../../core/models/payments.model';

@Component({
  selector: 'app-payments',
  standalone: false,
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  payments: Payment[] = [];
  editingId: number | null = null;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments(): void {
    this.paymentService.getPayments().subscribe(data => {
      this.payments = data;
    });
  }

  onEdit(id: number): void {
    this.editingId = id;
  }

  onSave(payment: Payment): void {
    this.paymentService.updatePayment(payment.id, payment).subscribe(() => {
      this.editingId = null;
      this.getPayments();
    });
  }

  onDelete(id: number): void {
    this.paymentService.deletePayment(id).subscribe(() => {
      this.getPayments();
    });
  }
}
