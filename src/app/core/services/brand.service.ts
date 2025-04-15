import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand, CreateBrand } from '../models/brand.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private apiUrl = `${environment.apiUrl}/brands`;  // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Get all brands
  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.apiUrl);
  }

  // Add a new brand
  addBrand(brand: CreateBrand): Observable<Brand> {  // Use CreateBrand here
    return this.http.post<Brand>(this.apiUrl, brand);
  }

  // Update an existing brand
  updateBrand(brand: Brand): Observable<Brand> {
    return this.http.put<Brand>(`${this.apiUrl}/${brand.id}`, brand);
  }

  // Delete a brand
  deleteBrand(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
