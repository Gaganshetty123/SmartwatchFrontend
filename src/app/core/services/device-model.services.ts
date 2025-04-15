import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DeviceModel } from '../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceModelService {
  private apiUrl = `${environment.apiUrl}/devicemodels`;

  constructor(private http: HttpClient) {}

  getDeviceModelsByBrand(brandId: number): Observable<DeviceModel[]> {
    return this.http.get<DeviceModel[]>(`${this.apiUrl}/brand/${brandId}`);
  }
}
