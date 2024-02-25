import {
  PropertyModelInterface,
  AddPropertyInterface,
  PropertyTypeInterface,
} from './../model/property.model';
import {
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';

export const PropertiesActions = createActionGroup({
  source: '[Properties]',
  events: {
    'Get Properties': props<{ page: number }>(),

    'Get Properties Success': props<{ properties: PropertyModelInterface[] }>(),

    'Get Properties Failure': props<{ error: string }>(),

    'Add Property': props<{ propertyData: AddPropertyInterface }>(),

    'Add Property Success': props<{ property: PropertyModelInterface }>(),

    'Add Property Failure': props<{ error: string }>(),

    'Update Property': props<{
      id: string;
      propertyData: AddPropertyInterface;
      images?: string[];
    }>(),

    'Update Property Success': props<{
      newProperty: PropertyModelInterface;
    }>(),

    'Update Property Failure': props<{ error: string }>(),

    'Get One Property': props<{ propertyId: string }>(),

    'Get One Property Success': props<{ property: PropertyModelInterface }>(),

    'Get One Property Failure': props<{ error: string }>(),

    'Get Own Properties': emptyProps(),

    'Get Own Properties Success': props<{
      ownProperties: PropertyModelInterface[];
    }>(),

    'Get Own Properties Failure': emptyProps(),

    'Delete Property': props<{ id: string }>(),

    'Delete Property Success': emptyProps(),

    'Delete Property Failure': emptyProps(),

    'Favour Property': props<{ id: string }>(),

    'Favor Property Success': props<{ id: string }>(),

    'Favor Property Failure': emptyProps(),

    'Unfavour Property': props<{ id: string }>(),

    'Unfavor Property Success': props<{ id: string }>(),

    'Unfavor Property Failure': emptyProps(),

    'Get Favorites Properties': emptyProps(),

    'Get Favorites Success': props<{
      favProperties: PropertyModelInterface[];
    }>(),

    'Get Favorite Properties Failure': emptyProps(),

    'Get Favorite Ids': emptyProps(),

    'Get Favorite Ids Success': props<{
      user: string;
      favoriteProperties: string[];
    }>(),

    'Get Favorite Ids Failure': emptyProps(),

    'Search Properties': props<{
      searchValue?: string;
      sortValue?: { value: string; desc: boolean };
      filterValue?: PropertyTypeInterface;
    }>(),

    'Search Properties Success': props<{
      searchResult: PropertyModelInterface[];
    }>(),

    'Search Properties Failure': emptyProps(),
  },
});
