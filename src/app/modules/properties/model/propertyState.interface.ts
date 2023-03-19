import { PropertyModelInterface } from './property.model';
export interface PropertyStateInterface {
  properties: PropertyModelInterface[];
  selectedProperty: selectedPropertyInterface;
  page: number;
  mostBottomReached: boolean;
  ownProperties: PropertyModelInterface[];
  favorites: PropertyModelInterface[];
  favoriteIds: string[];
}

export interface selectedPropertyInterface {
  property: PropertyModelInterface | null;
  isFavorite: boolean;
}
