import { Brand } from "./brand.model";

export interface DeviceModel {
    id: number;
    modelName: string;
    brandId: number;
    brand: Brand;  // This will now hold the brand data
  }