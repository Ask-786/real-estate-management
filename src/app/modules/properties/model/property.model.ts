export interface PropertyModelInterface {
  title: string;
  price: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  _id: string;
  propertyType: propertyTypeEnum;
  owner: string;
  isAvailable: boolean;
  images: string[];
  description: string;
  coOrdinates: coOrdinatesInterface;
  address: propertyAddressInterface;
}

export enum propertyTypeEnum {
  land = 'land',
  property = 'property',
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
