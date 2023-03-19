export interface CreateEnquiryFormInterface {
  title: string;
  content: string;
  topic: string;
  property: string;
}

export interface EnquiryModelInterface {
  title: string;
  sender: string;
  propertyOwner: string;
  senderEmail: string;
  content: string;
  property: string;
  topic: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface PropertyPopulatedEnquiryModelInterface {
  _id: string;
  title: string;
  sender: string;
  propertyOwner: string;
  senderEmail: string;
  content: string;
  property: Property;
  topic: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface Property {
  _id: string;
  title: string;
  price: number;
  description: string;
  tags: string[];
  coOrdinates: CoOrdinates;
  images: string[];
  propertyType: string;
  isAvailable: boolean;
  owner: string;
  address: Address;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface Address {
  country: string;
  state: string;
  district: string;
  city: string;
  streetAddress: string;
  zipCode: number;
  _id: string;
}

interface CoOrdinates {
  lattitude: number;
  longitude: number;
}
