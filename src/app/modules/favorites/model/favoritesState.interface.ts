import { PropertyModelInterface } from './../../properties/model/property.model';
export interface FavoritesStateInterface {
  favorites: PropertyModelInterface[];
  mostBottomReached: boolean;
}
