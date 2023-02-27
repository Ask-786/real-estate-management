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
  title: string | null;
  price: number | null;
  tags: string | null;
  description: string | null;
  lattitude: number | null;
  longitude: number | null;
  propertyType: string | null;
  country: string | null;
  state: string | null;
  district: string | null;
  city: string | null;
  streetAddress: string | null;
  zipCode: number | null;
}
