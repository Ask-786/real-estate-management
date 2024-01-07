import { route, stringParser } from 'typesafe-routes';

export const AppRoutes = {
  home: route('/', {}, {}),
  auth: route(
    'auth',
    {},
    {
      login: route('login', {}, {}),
      signup: route('signup', {}, {}),
      logout: route('logout', {}, {}),
    },
  ),
  enquiries: route(
    'enquiries',
    {},
    {
      home: route('', {}, {}),
      enquiry: route(':id', { id: stringParser }, {}),
      ownEnquiries: route('own-enquiries', {}, {}),
      ownEnquiry: route('own-enquiries/:id', { id: stringParser }, {}),
    },
  ),
  properties: route(
    'properties',
    {},
    {
      home: route('', {}, {}),
      property: route('property/:id', { id: stringParser }, {}),
      ownProperties: route('own-properties', {}, {}),
      ownProperty: route('own-properties/:id', { id: stringParser }, {}),
      favorites: route('favorites', {}, {}),
      favorite: route('favorites/:id', { id: stringParser }, {}),
    },
  ),
  user: route(
    'user',
    {},
    {
      profile: route('profile', {}, {}),
    },
  ),
  notification: route(
    'notification',
    {},
    {
      home: route('', {}, {}),
    },
  ),
  map: route('map', {}, {}),
} as const;
