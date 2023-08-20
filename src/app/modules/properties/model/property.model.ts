import { FormControl } from '@angular/forms';

export enum PropertyTypeEnum {
  land = 'land',
  residential = 'residential',
  commercial = 'commercial',
  industrial = 'industrial',
}

export type PropertyTypeInterface = {
  land: boolean;
  residential: boolean;
  commercial: boolean;
  industrial: boolean;
};

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
  tags: string[];
  description: string;
  lattitude: number;
  longitude: number;
  propertyType: string;
  country: string;
  state: string;
  district: string;
  city: string;
  streetAddress: string;
  zipCode: string;
  images: string[];
}

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
  enquirers: string[];
}

export interface PropertyFormModelInterface {
  title: FormControl<string | null>;
  price: FormControl<number | null>;
  tags: FormControl<string[] | null>;
  description: FormControl<string | null>;
  lattitude: FormControl<number | null>;
  longitude: FormControl<number | null>;
  propertyType: FormControl<string | null>;
  country: FormControl<string | null>;
  state: FormControl<string | null>;
  district: FormControl<string | null>;
  city: FormControl<string | null>;
  streetAddress: FormControl<string | null>;
  zipCode: FormControl<string | null>;
  images: FormControl<string[]>;
}
