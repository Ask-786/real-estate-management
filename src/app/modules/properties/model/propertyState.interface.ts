import { PropertyModelInterface } from './property.model';
export interface PropertyStateInterface {
  properties: PropertyModelInterface[];
  selectedProperty: SelectedPropertyInterface;
  page: number;
  mostBottomReached: boolean;
  ownProperties: PropertyModelInterface[];
  favorites: PropertyModelInterface[];
  favoriteIds: string[];
}

export interface SelectedPropertyInterface {
  property: PropertyModelInterface | null;
  isFavorite: boolean;
}
