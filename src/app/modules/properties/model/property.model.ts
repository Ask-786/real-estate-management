export interface PropertyModelInterface {
  title: string;
  price: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  _id: string;
  propertyType: PropertyTypeEnum;
  owner: string;
  isAvailable: boolean;
  images: string[];
  description: string;
  coOrdinates: coOrdinatesInterface;
  address: propertyAddressInterface;
}

export enum PropertyTypeEnum {
  land = 'land',
  residential = 'residential',
  commercial = 'commercial',
  industrial = 'industrial',
}

export interface coOrdinatesInterface {
  longitude: number;
  lattitude: number;
}

export interface propertyAddressInterface {
  country: string;
  state: string;
  district: string;
  city: string;
  streetAddress: string;
  zipCode: string;
}

export interface AddPropertyInterface {
  title: string;
  price: number;
  tags: string;
  description: string;
  lattitude: number;
  longitude: number;
  propertyType: string;
  country: string;
  state: string;
  district: string;
  city: string;
  streetAddress: string;
  zipCode: number;
  images: string[];
}
