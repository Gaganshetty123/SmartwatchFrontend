import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../../core/services/brand.service';
import { DeviceModelService } from '../../../core/services/device-model.services';
import { Brand } from '../../../core/models/brand.model';
import { DeviceModel } from '../../../core/models/device.model';


@Component({
  selector: 'app-customer-dashboard',
  standalone: false,
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent implements OnInit {
  brands: Brand[] = [];
  selectedDevices: DeviceModel[] = [];
  selectedBrandId: string | null = null;
  selectedDeviceId: string | null = null;
  selectedService: any = null;
  repairServices: any[] = [
    { name: 'Battery Replacement', price: 100 },
    { name: 'Display Replacement', price: 150 },
    { name: 'Other', price: 50 }
  ];

  constructor(
    private brandService: BrandService,
    private deviceModelService: DeviceModelService
  ) {}

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {
    this.brandService.getBrands().subscribe(data => {
      this.brands = data;
    });
  }

  onBrandClick(brandId: string): void {
    const brandIdNumber = Number(brandId);
    if (!isNaN(brandIdNumber)) {
      this.selectedBrandId = brandId;
      this.deviceModelService.getDeviceModelsByBrand(brandIdNumber).subscribe(data => {
        this.selectedDevices = data;
      });
    }
  }

  onDeviceClick(deviceId: string): void {
    this.selectedDeviceId = deviceId;
  }

  onServiceSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedService = this.repairServices[selectElement.selectedIndex];
    this.selectedService = selectedService;
  }

  getSelectedBrandName(): string {
    if (this.selectedBrandId) {
      const brand = this.brands.find(b => b.id === this.selectedBrandId);
      return brand ? brand.name : 'Unknown Brand';
    }
    return '';
  }

  getSelectedDeviceName(): string {
    if (this.selectedDeviceId) {
      // Convert selectedDeviceId to number for comparison
      const selectedDeviceIdNumber = Number(this.selectedDeviceId);
      const device = this.selectedDevices.find(d => d.id === selectedDeviceIdNumber);
      return device ? device.modelName : 'Unknown Device';
    }
    return '';
  }

  submitRepairIssue(): void {
    if (this.selectedDeviceId && this.selectedService) {
      console.log('Submitting repair issue:', {
        deviceId: this.selectedDeviceId,
        service: this.selectedService
      });
      // Call your API to submit the repair issue here.
    } else {
      console.log('Please select a service to submit');
    }
  }
}
