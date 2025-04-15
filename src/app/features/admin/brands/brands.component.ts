import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../../core/services/brand.service';
import { Brand, CreateBrand } from '../../../core/models/brand.model';

@Component({
  selector: 'app-brands',
  standalone:false,
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  brands: Brand[] = [];
  newBrandName = '';

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(): void {
    this.brandService.getBrands().subscribe((data) => {
      this.brands = data;  // Brands are fetched and stored here
    });
  }

  onAdd(): void {
    if (!this.newBrandName.trim()) return;
  
    const newBrand: CreateBrand = { name: this.newBrandName };
  // No id field
    this.brandService.addBrand(newBrand).subscribe(() => {
      this.newBrandName = '';
      this.getBrands();
    });
  }
  
  

  onUpdate(brand: Brand): void {
    this.brandService.updateBrand(brand).subscribe(() => {
      this.getBrands();
    });
  }
  editingId: string | null = null;
editingName: string = '';

onEdit(brand: Brand): void {
  this.editingName = brand.name;
}

onSave(): void {
  if (!this.editingId) return;
  const updatedBrand: Brand = {
    id: this.editingId,
    name: this.editingName
  };
  this.brandService.updateBrand(updatedBrand).subscribe(() => {
    this.editingId = null;
    this.editingName = '';
    this.getBrands();
  });
}


  onDelete(id: string): void {
    this.brandService.deleteBrand(id).subscribe(() => {
      this.getBrands();
    });
  }
}
