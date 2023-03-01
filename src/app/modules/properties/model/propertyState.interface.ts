import { PropertyModelInterface } from './property.model';
export interface PropertyStateInterface {
  isLoading: boolean;
  properties: PropertyModelInterface[];
  error: null | string;
  selectedProperty: null | PropertyModelInterface;
  page: number;
}
