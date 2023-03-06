import { PropertyModelInterface } from './property.model';
export interface PropertyStateInterface {
  properties: PropertyModelInterface[];
  selectedProperty: PropertyModelInterface | null;
  page: number;
  mostBottomReached: boolean;
}
